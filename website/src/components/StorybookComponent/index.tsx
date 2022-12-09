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

  variant?: string;
  /**
   * Which variant of the story to show. If no variant is given, Storybook will redirect to the default.
   */
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

function getStoryUrl(implementation: Implementation, name: string, variant: string | undefined): string {
  const version = getVersion();

  return `https://storybook.dso-toolkit.nl/${version !== "local" ? version : "master"}/?path=/story/${getStoryUrlId(
    implementation,
    name,
    variant
  )}&viewMode=story`;
}

function getStoryUrlId(implementation: Implementation, name: string, variant: string | undefined) {
  if (isComposedStorybook(implementation)) {
    return `${implementation}_${joinNameAndVariant(name, variant)}`;
  }

  return `${implementation}-${joinNameAndVariant(name, variant)}`;
}

function getStoryIframeUrl(implementation: Implementation, name: string, variant: string | undefined): string {
  const host = window.location.hostname === "localhost" ? "dso-toolkit.nl" : window.location.host;
  const version = getVersion();
  const subDomain = getSubDomain(implementation);
  const id = getStoryIframeId(implementation, name, variant);

  return `https://${host}/!${subDomain}/${
    version !== "local" ? version : "master"
  }/iframe.html?id=${id}&viewMode=story`;
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

export function StorybookComponent({ name, implementations, variant }: Props) {
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
              src={getStoryIframeUrl(implementation, name ?? getNameFromPathname(pathname), variant)}
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
                to={getStoryUrl(implementation, name ?? getNameFromPathname(pathname), variant)}
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
