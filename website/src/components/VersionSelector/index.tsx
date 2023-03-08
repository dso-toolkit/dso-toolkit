import React, { useEffect, useState } from "react";
import DropdownNavbarItem from "@theme/NavbarItem/DropdownNavbarItem";
import type { LinkLikeNavbarItemProps } from "@theme/NavbarItem";

import styles from "./styles.module.scss";
import clsx from "clsx";
import {
  getAllVersions,
  getVersion,
  isLatestVersion,
  isMasterVersion,
  isReleaseVersion,
  isSelectedVersion,
  isTopicVersion,
  Latest,
  Master,
  Release,
  Topic,
  Version,
} from "@site/src/functions/versions.function";

function mapVersion(version: Version) {
  return {
    label: version.version[0] === "_" ? `#${version.version.substring(1)}` : version.version,
    className: clsx({ "dropdown__link--active": isSelectedVersion(version) }, styles.navItem),
    href: `https://www.dso-toolkit.nl/${version.version}`,
    target: "_self",
  };
}

function mapLatest(version: Latest, releases: Release[]) {
  return {
    label: `${version.version} 🏁 (${releases[releases.length - 1]?.version})`,
    className: clsx(styles.navItem),
    href: `https://www.dso-toolkit.nl/${version.version}`,
    target: "_self",
  };
}

function mapMaster(version: Master) {
  return {
    label: `${version.version} 🚧`,
    className: clsx(styles.navItem),
    href: `https://www.dso-toolkit.nl/${version.version}`,
    target: "_self",
  };
}

function getVersionLabel(): string {
  const version = getVersion();

  if (version?.startsWith("_")) {
    const issueId = parseInt(version.substring(1, version.indexOf("-")));

    return `#${isNaN(issueId) ? version.substring(1) : issueId}`;
  }

  if (version === "latest") {
    return "latest 🏁";
  }

  if (version === "master") {
    return "master 🚧";
  }

  if (version === "local") {
    return "dev 👨‍🔧";
  }

  return version ?? "Onbekend";
}

export default function VersionSelector(): JSX.Element | null {
  const [versions, setVersions] = useState<LinkLikeNavbarItemProps[] | undefined>();

  useEffect(() => {
    async function fetchData() {
      const parsed = await getAllVersions();

      const latestVersions: Latest[] = [];
      const masterVersions: Master[] = [];
      const topicsVersions: Topic[] = [];
      const releases: Release[] = [];

      for (const version of parsed) {
        if (isTopicVersion(version)) {
          topicsVersions.push(version);
        }

        if (isLatestVersion(version)) {
          latestVersions.push(version);
        }

        if (isMasterVersion(version)) {
          masterVersions.push(version);
        }

        if (isReleaseVersion(version)) {
          releases.push(version);
        }
      }

      const list: LinkLikeNavbarItemProps[] = [
        ...latestVersions.map((v) => mapLatest(v, releases)),
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
        ...masterVersions.map((v) => mapMaster(v)),
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

  return versions ? (
    <DropdownNavbarItem position="right" label={`Versie: ${getVersionLabel()}`} items={versions} />
  ) : null;
}
