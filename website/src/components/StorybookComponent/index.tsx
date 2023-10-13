import IframeResizer from "iframe-resizer-react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import React, { useEffect, useState } from "react";

import { getVersion } from "@site/src/functions/versions.function";
import styles from "./styles.module.scss";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";

type Implementation = "core" | "angular" | "html-css" | "react";

const allImplementations = ["core", "angular", "react", "html-css"] as const;

interface Props {
  /**
   * Name of component. If not defined, it's created from location.
   */
  name?: string;

  /**
   * Implementations of this component. If no implementation, all implementations are assumed.
   */
  implementations?: Implementation[];

  /**
   * Which variant of the story to show. If no variant is given, Storybook will redirect to the default.
   */
  variant?: string;

  /**
   * Optional arguments to pass on, to show specific states of the component. If no arguments are given, Storybook will redirect to the default arguments.
   */
  args?: Record<string, unknown>;
}

function getSubDomain(implementation: Implementation) {
  return isComposedStorybook(implementation) ? implementation : "storybook";
}

function isComposedStorybook(implementation: Implementation) {
  return implementation === "react" || implementation === "angular";
}

function joinNameAndVariant(name: string, variant: string | undefined) {
  return [name, variant].filter((t) => !!t).join("--");
}

function getStoryUrlId(implementation: Implementation, name: string, variant: string | undefined) {
  if (isComposedStorybook(implementation)) {
    return `${implementation}_${joinNameAndVariant(name, variant)}`;
  }

  return `${implementation}-${joinNameAndVariant(name, variant)}`;
}

function stringifyStorybookArgs(args: Record<string, unknown>): string {
  return Object.entries(args)
    .map(([key, value]) => stringifyStorybookArg(key, value))
    .join(";");
}

function stringifyStorybookArg(key: string, value: unknown) {
  if (typeof value === "boolean") {
    return `${key}:${`!${value}`}`;
  }

  return `${key}:${value}`;
}

function getStoryIframeId(implementation: Implementation, name: string, variant: string | undefined) {
  if (isComposedStorybook(implementation) || name.startsWith("voorbeeldpagina")) {
    return joinNameAndVariant(name, variant);
  }

  return `${implementation}-${joinNameAndVariant(name, variant)}`;
}

function getNameFromPathname(pathname: string): string {
  let root: string | undefined;
  let path: string[] | undefined;

  if (window.location.hostname === "localhost") {
    [, root, ...path] = pathname.split("/");
  } else {
    [, , root, ...path] = pathname.split("/");
  }

  if (root !== "components" || !path || path.length === 0) {
    throw new Error(`Unable to get name from non-components location: ${location.pathname} (${root})`);
  }

  const component = path.at(-1);
  if (!component) {
    throw new Error(`No component found for ${location.pathname}`);
  }

  return component;
}

function getStoryIframeUrlLocalhost() {
  return new URL("iframe.html", "http://localhost:45000");
}

function getStoryIframeUrlRemote(implementation: Implementation) {
  const version = getVersion();
  const subDomain = getSubDomain(implementation);

  const path = [`!${subDomain}`, version !== "local" ? version : "master", "iframe.html"].join("/");
  return new URL(path, `https://${window.location.host}`);
}

function getStoryIframeUrl(
  implementation: Implementation,
  name: string,
  variant?: string,
  args?: Record<string, unknown>
): string {
  const url =
    window.location.hostname === "localhost" ? getStoryIframeUrlLocalhost() : getStoryIframeUrlRemote(implementation);
  const id = getStoryIframeId(implementation, name, variant);

  const searchParamsObject: Record<string, string> = {
    id,
    viewMode: "story",
  };

  if (args) {
    searchParamsObject.args = stringifyStorybookArgs(args);
  }

  const searchParams = new URLSearchParams(searchParamsObject);

  return `${url}?${searchParams}`;
}

function getStoryUrlLocalhost() {
  return "http://localhost:45000";
}

function getStoryUrlRemote(version: string) {
  return `https://storybook.dso-toolkit.nl/${version !== "local" ? version : "master"}`;
}

function getStoryUrl(
  implementation: Implementation,
  name: string,
  variant?: string,
  args?: Record<string, unknown>
): string {
  const version = getVersion();
  const url = window.location.hostname === "localhost" ? getStoryUrlLocalhost() : getStoryUrlRemote(version);

  const searchParamsObject: Record<string, string> = {
    viewMode: "story",
  };

  if (args) {
    searchParamsObject.args = stringifyStorybookArgs(args);
  }

  const searchParams = new URLSearchParams(searchParamsObject);

  return `${url}/?path=/story/${getStoryUrlId(implementation, name, variant)}&${searchParams}`;
}

export function StorybookComponent({ name, implementations, variant, args }: Props) {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(true);
  const [implementation, setImplementation] = useState<Implementation>(() => {
    const implementation = (implementations ?? allImplementations)[0];
    if (!implementation) {
      throw new Error(`No implementation found for ${name ?? getNameFromPathname(pathname)}`);
    }

    return implementation;
  });

  useEffect(() => {
    if (!loading) {
      setLoading(true);
    }
  }, [implementation]);

  return (
    <div className={styles.container}>
      <BrowserOnly>
        {() => (
          <>
            {loading && <div className={styles.loading}>loading</div>}
            <IframeResizer
              onLoad={() => setLoading(false)}
              src={getStoryIframeUrl(implementation, name ?? getNameFromPathname(pathname), variant, args)}
              style={{ width: "1px", minWidth: "100%" }}
              heightCalculationMethod="lowestElement"
            />
            <div className={styles.implementationButtons}>
              {allImplementations
                .filter((i) => implementations?.includes(i) ?? true)
                .map((i) => (
                  <button
                    type="button"
                    key={i}
                    className={i === implementation ? styles.activeButton : undefined}
                    onClick={() => setImplementation(i)}
                  >
                    {i}
                  </button>
                ))}
              <Link
                to={getStoryUrl(implementation, name ?? getNameFromPathname(pathname), variant, args)}
                className={styles.openInStorybook}
              >
                Open in Storybook
              </Link>
            </div>
          </>
        )}
      </BrowserOnly>
    </div>
  );
}
