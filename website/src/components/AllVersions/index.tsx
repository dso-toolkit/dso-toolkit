import Link from "@docusaurus/Link";
import React, { useEffect, useState } from "react";

import { Release, getAllVersions, isReleaseVersion } from "@site/src/functions/versions.function";

export function AllVersions() {
  const [versions, setVersions] = useState<Release[] | undefined>(undefined);

  useEffect(() => {
    async function fetchData() {
      const versions = await getAllVersions();

      setVersions(versions.reverse().filter((v) => isReleaseVersion(v)));
    }

    fetchData().catch(console.error);
  }, []);

  return (
    <ul>
      {versions?.map((v) => {
        if (v.version) {
          return (
            <li key={v.version}>
              <Link href={`https://dso-toolkit.nl/${v.version}`} target="_blank">
                v{v.version}
              </Link>
            </li>
          );
        }
      })}
    </ul>
  );
}
