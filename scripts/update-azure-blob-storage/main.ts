/**
 * This file:
 * 1. Removes all branch deploys whose git branch is deleted.
 * 2. Updates dso-toolkit.nl/versions.json with all the deployed releases (tags and branches) in the Azure Blob Storage container.
 * 3. Updates dso-toolkit.nl/index.html with the latest version.
 */

import { DataLakeServiceClient, StorageSharedKeyCredential } from "@azure/storage-file-datalake";
import { render } from "@lit-labs/ssr";
import { collectResultSync } from "@lit-labs/ssr/lib/render-result.js";
import minimist from "minimist";
import { rsort, sort, valid } from "semver";

import { getGithubBranches } from "./get-github-branches.function";
import { indexHtml } from "./index-html.template";

interface Args {
  azureStorageHost: string | undefined;
  azureStorageContainer: string | undefined;
  azureSasToken: string | undefined;
  githubToken: string | undefined;
}

const args = minimist<Args>(process.argv.slice(2));

main(
  args.azureStorageAccountName,
  args.azureStorageAccountKey,
  args.azureStorageHostDfs,
  args.azureStorageContainer,
  args.githubToken,
).catch((error) => {
  console.error(error);

  process.exit(1);
});

interface VersionsJson {
  versions: Version[];
}

interface Version {
  version: string;
  branch?: string;
  label?: string;
}

async function main(
  azureStorageAccountName: string | undefined,
  azureStorageAccountKey: string | undefined,
  azureStorageHostDfs: string | undefined,
  azureStorageContainer: string | undefined,
  githubToken: string | undefined,
) {
  if (
    !azureStorageAccountName ||
    !azureStorageAccountKey ||
    !azureStorageHostDfs ||
    !azureStorageContainer ||
    !githubToken
  ) {
    // Redact the values to avoid leaking secrets but still show which ones are missing or empty
    const redacted = {
      azureStorageAccountName: !!azureStorageAccountName,
      azureStorageAccountKey: !!azureStorageAccountKey,
      azureStorageHostDfs: !!azureStorageHostDfs,
      azureStorageContainer: !!azureStorageContainer,
      githubToken: !!githubToken,
    };

    throw new Error(`Missing required variables. Started with: ${JSON.stringify(redacted, null, 2)}`);
  }

  const sharedKeyCredential = new StorageSharedKeyCredential(azureStorageAccountName, azureStorageAccountKey);
  const dataLakeServiceClient = new DataLakeServiceClient(`https://${azureStorageHostDfs}/`, sharedKeyCredential);

  const client = dataLakeServiceClient.getFileSystemClient(azureStorageContainer);

  console.info("Updating releases");

  const gitBranches = await getGithubBranches(githubToken);

  /**
   * site roots to where releases are deployed to, without trailing slash
   */
  const siteRoots: Array<{ path: string; main?: boolean }> = [
    { path: "angular.dso-toolkit.nl/www" },
    { path: "cdn.dso-toolkit.nl/www/dso-toolkit" },
    { path: "cdn.dso-toolkit.nl/www/@dso-toolkit/core" },
    { path: "dso-toolkit.nl/www", main: true },
    { path: "react.dso-toolkit.nl/www" },
    { path: "storybook.dso-toolkit.nl/www" },
  ];

  const branches = [];
  const tags = [];

  for (const siteRoot of siteRoots) {
    console.info(`Updating ${siteRoot.path}`);
    const sitePrefix = `${siteRoot.path}/`;
    const paths = client.listPaths({ path: sitePrefix });

    for await (const path of paths) {
      console.info(`Processing ${path.name}`);
      if (path.isDirectory && /* make typing happy */ path.name !== undefined) {
        // dso-toolkit.nl/www/<NAME>
        const name = path.name.slice(sitePrefix.length, path.name.length);

        // Only directies starting with _ are considered branch deploys. The __bak directory was used for backups.
        if (name[0] === "_" && name[1] !== "_") {
          // if the branch does not exist on github, delete the branch deploy
          if (!gitBranches.find((branch) => branch.name === name)) {
            console.info(`Deleting branch deploy ${path.name}`);
            await client.getDirectoryClient(path.name).delete(true);

            // if the branch does exist on github and if the current siteRoot is used for versions, add it to the list of branches
          } else if (siteRoot.main) {
            branches.push(name);
          }
          // if the directory is not a branch deploy, it is a tag deploy. only add if the siteRoot is used for versions
        } else if (valid(name) && siteRoot.main) {
          tags.push(name);
        }
      }
    }
  }

  const versions: VersionsJson = {
    versions: [
      ...sort(tags).map((tag) => ({ version: tag })),
      {
        version: "master",
        branch: "master",
      },
      {
        version: "latest",
        branch: "latest",
      },
      {
        version: "next",
        branch: "next",
      },
      ...branches.map((branch) => ({ version: branch, branch: "topic", label: `#${branch.substring(1)}` })),
    ],
  };

  const versionsJson = JSON.stringify(versions, null, 2);

  const versionPrefix = siteRoots.find((siteRoot) => siteRoot.main)?.path;
  if (!versionPrefix) {
    throw new Error("No version source found in siteRoots.");
  }

  await client.getFileClient(`${versionPrefix}/versions.json`).upload(Buffer.from(versionsJson));

  console.info("Done updating versions");

  console.info("Updating index.html");

  const latestVersion = rsort(tags)[0];
  const indexHtmlContent = indexHtml(latestVersion);

  const document = collectResultSync(render(indexHtmlContent));

  await client.getFileClient(`${versionPrefix}/index.html`).upload(Buffer.from(document));

  console.info("Done updating index.html");
}
