import React, { useEffect, useState } from "react";
import DropdownNavbarItem from "@theme/NavbarItem/DropdownNavbarItem";
import type { LinkLikeNavbarItemProps } from "@theme/NavbarItem";

import styles from "./styles.module.scss";
import clsx from "clsx";

interface Release {
  version: string;
}

interface Master {
  version: "master";
  branch: "master";
}

interface Topic {
  version: string;
  branch: "topic";
  label: string;
}

type Version = Release | Master | Topic;

function isReleaseVersion(version: unknown): version is Release {
  return typeof version["version"] === "string" && Object.keys(version).length === 1;
}

function isMasterVersion(version: unknown): version is Master {
  return (
    typeof version["branch"] === "string" &&
    version["branch"] === "master" &&
    typeof version["version"] === "string" &&
    version["version"] === "master" &&
    Object.keys(version).length === 2
  );
}

function isTopicVersion(version: unknown): version is Topic {
  return (
    typeof version["branch"] === "string" &&
    version["branch"] === "topic" &&
    typeof version["version"] === "string" &&
    typeof version["label"] === "string" &&
    Object.keys(version).length === 3
  );
}

function isVersion(version: unknown): version is Version {
  return isTopicVersion(version) || isMasterVersion(version) || isReleaseVersion(version);
}

function isSelectedVersion(version: Version) {
  return document.location.pathname.split("/")[1] === version.version;
}

function mapVersion(version: Version) {
  return {
    label: version.version[0] === "_" ? `#${version.version.substring(1)}` : version.version,
    className: clsx({ "dropdown__link--active": isSelectedVersion(version) }, styles.navItem),
    href: `https://www.dso-toolkit.nl/${version.version}`,
    target: "_self",
  };
}

function mapMaster(version: Master) {
  return {
    label: `${version.version} 🚧`,
    href: `https://www.dso-toolkit.nl/${version.version}`,
    target: "_self",
    className: clsx(styles.navItem),
  };
}

export default function HomepageFeatures(): JSX.Element {
  const [versions, setVersions] = useState<LinkLikeNavbarItemProps[] | undefined>();

  useEffect(() => {
    async function fetchData() {
      const result = await fetch("https://www.dso-toolkit.nl/versions.json?t=" + new Date().getTime());

      const { versions } = await result.json();

      if (!Array.isArray(versions)) {
        throw new Error("versions is not an array");
      }

      const parsed = versions.reduce<Version[]>((total, version) => {
        if (isVersion(version)) {
          total.push(version);
        }

        return total;
      }, []);

      const topicsVersions: Topic[] = [];
      const masterVersions: Master[] = [];
      const releases: Release[] = [];

      for (const version of parsed) {
        if (isTopicVersion(version)) {
          topicsVersions.push(version);
        }

        if (isMasterVersion(version)) {
          masterVersions.push(version);
        }

        if (isReleaseVersion(version)) {
          releases.push(version);
        }
      }

      const list: LinkLikeNavbarItemProps[] = [
        ...masterVersions.map((v) => mapMaster(v)),
        ...releases
          .reverse()
          .slice(0, 5)
          .map((v) => mapVersion(v)),
        {
          type: "html",
          value: '<hr class="dropdown-separator">',
        },
        {
          type: "html",
          className: styles.heading,
          value: "Branch releases",
        },
        ...topicsVersions.map((v) => mapVersion(v)),
        {
          type: "html",
          value: '<hr class="dropdown-separator">',
        },
        {
          type: "doc",
          docId: "all-versions",
          exact: true,
          label: "Alle versies",
        },
      ];

      setVersions(list);
    }

    fetchData().catch(console.error);
  }, []);

  return versions ? <DropdownNavbarItem position="right" label="Versies" items={versions} /> : null;
}
