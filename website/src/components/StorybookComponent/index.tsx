import IframeResizer from "iframe-resizer-react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import React, { useEffect, useState } from "react";

import { getVersion } from "@site/src/functions/versions.function";
import styles from "./styles.module.scss";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";

type Implementation = "core" | "angular" | "css" | "react";

const allImplementations = ["core", "angular", "react", "css"] as const;

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
  return ["react", "angular"].includes(implementation) ? implementation : "storybook";
}

function getStoryUrl(name: string, implementation: Implementation, variant: string | undefined): string {
  const version = getVersion();
  const subDomain = getSubDomain(implementation);

  return `https://${subDomain}.dso-toolkit.nl/${version !== "local" ? version : "master"}/?path=/story/${getStoryId(
    name,
    implementation,
    variant
  )}&viewMode=story`;
}

function getStoryIframeUrl(name: string, implementation: Implementation, variant: string | undefined): string {
  const version = getVersion();
  const subDomain = getSubDomain(implementation);

  return `https://${window.location.hostname === "localhost" ? "dso-toolkit.nl" : window.location.host}/!${subDomain}/${
    version !== "local" ? version : "master"
  }/iframe.html?id=${getStoryId(name, implementation, variant)}&viewMode=story`;
}

function getStoryId(name: string, implementation: Implementation, variant: string | undefined) {
  let id = "";

  if (implementation === "react" || implementation === "angular" || name.startsWith("voorbeeldpagina")) {
    id += name;
  } else {
    id += `${implementation === "css" ? "html-css" : "core"}-${name}`;
  }

  if (variant) {
    id += `--${variant}`;
  }

  return id;
}

function getNameFromLocation(pathname: string): string {
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
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [implementation, setImplementation] = useState<Implementation>(() => {
    const implementation = (implementations ?? allImplementations)[0];
    if (!implementation) {
      throw new Error(`No implementation found for ${name}`);
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
              src={getStoryIframeUrl(name ?? getNameFromLocation(location.pathname), implementation, variant)}
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
                to={getStoryUrl(name ?? getNameFromLocation(location.pathname), implementation, variant)}
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
