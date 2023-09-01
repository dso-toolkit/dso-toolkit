import BrowserOnly from "@docusaurus/BrowserOnly";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import { getVersion } from "@site/src/functions/versions.function";
import IframeResizer from "iframe-resizer-react";
import React, { useEffect, useState } from "react";

import styles from "./styles.module.scss";

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

  /**
   * Code example which can be copied.
   */
  code?: string;
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
  let path: string | undefined;
  let component: string | undefined;

  if (window.location.hostname === "localhost") {
    [, path, component] = pathname.split("/");
  } else {
    [, , path, component] = pathname.split("/");
  }

  if (path !== "components" || !component) {
    throw new Error(`Unable to get name from non-components location: ${location.pathname}`);
  }

  return component;
}

function getStoryIframeUrl(
  implementation: Implementation,
  name: string,
  variant?: string,
  args?: Record<string, unknown>
): string {
  const host = window.location.hostname === "localhost" ? "dso-toolkit.nl" : window.location.host;
  const version = getVersion();
  const subDomain = getSubDomain(implementation);
  const id = getStoryIframeId(implementation, name, variant);

  const path = [`!${subDomain}`, version !== "local" ? version : "master", "iframe.html"].join("/");
  const url = new URL(path, `https://${host}`);

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

function getStoryUrl(
  implementation: Implementation,
  name: string,
  variant?: string,
  args?: Record<string, unknown>
): string {
  const version = getVersion();

  const searchParamsObject: Record<string, string> = {
    viewMode: "story",
  };

  if (args) {
    searchParamsObject.args = stringifyStorybookArgs(args);
  }

  const searchParams = new URLSearchParams(searchParamsObject);

  return `https://storybook.dso-toolkit.nl/${version !== "local" ? version : "master"}/?path=/story/${getStoryUrlId(
    implementation,
    name,
    variant
  )}&${searchParams}`;
}

async function copyCode(e: React.MouseEvent) {
  const button = e.currentTarget;
  if (!(button instanceof HTMLButtonElement)) {
    return;
  }
  const block = button.closest("pre");

  if (!(block instanceof HTMLPreElement)) {
    return;
  }

  const code = block.querySelector("code");

  if (!(code instanceof HTMLElement)) {
    return;
  }

  const text = code.innerText;

  await navigator.clipboard.writeText(text);

  button.innerText = "Copied";

  setTimeout(() => {
    button.innerText = "Copy";
  }, 700);
}

export function StorybookComponent({ name, implementations, variant, args, code }: Props) {
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
            {code && (
              <pre className={styles.codePre} tabIndex={0}>
                <code className={styles.codeBlock}>{code}</code>
                <div className={styles.codeButton}>
                  <button className={styles.copyButton} type="button" onClick={copyCode}>
                    Copy
                  </button>
                </div>
              </pre>
            )}
          </>
        )}
      </BrowserOnly>
    </div>
  );
}
