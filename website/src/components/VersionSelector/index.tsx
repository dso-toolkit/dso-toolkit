import clsx from "clsx";
import React, { useEffect, useState } from "react";

import {
  Master,
  Release,
  Topic,
  Version,
  getAllVersions,
  getVersion,
  isMasterVersion,
  isReleaseVersion,
  isSelectedVersion,
  isTopicVersion,
} from "@site/src/functions/versions.function";

import type { LinkLikeNavbarItemProps } from "@theme/NavbarItem";
import DropdownNavbarItem from "@theme/NavbarItem/DropdownNavbarItem";

import styles from "./styles.module.scss";

function mapVersion(version: Version) {
  return {
    label: version.version[0] === "_" ? `#${version.version.substring(1)}` : version.version,
    className: clsx({ "dropdown__link--active": isSelectedVersion(version) }, styles.navItem),
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

  if (version === "master") {
    return "master 🚧";
  }

  if (version === "local") {
    return "dev 👨‍🔧";
  }

  return version ?? "Onbekend";
}

function mapMaster(version: Master) {
  return {
    label: `${version.version} 🚧`,
    href: `https://www.dso-toolkit.nl/${version.version}`,
    target: "_self",
    className: clsx(styles.navItem),
  };
}

export default function VersionSelector(): JSX.Element | null {
  const [versions, setVersions] = useState<LinkLikeNavbarItemProps[] | undefined>();

  useEffect(() => {
    async function fetchData() {
      const parsed = await getAllVersions();

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

  return versions ? (
    <DropdownNavbarItem position="right" label={`Versie: ${getVersionLabel()}`} items={versions} />
  ) : null;
}
