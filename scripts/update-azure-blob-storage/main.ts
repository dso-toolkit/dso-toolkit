/**
 * This file:
 * - Updates dso-toolkit.nl/versions.json with all the deployed releases (tags and branches) in the Azure Blob Storage container.
 * - Updates dso-toolkit.nl/index.html with the latest version.
 * - Removes all deployed branches which are not in the versions.json file.
 */
/* eslint-disable no-console -- cli script, needs to output to stdout */

import { BlobServiceClient } from "@azure/storage-blob";
import { valid, sort, rsort } from "semver";
import minimist from "minimist";
import { collectResultSync } from "@lit-labs/ssr/lib/render-result.js";
import { render } from "@lit-labs/ssr";

import { indexHtml } from "./index-html.template";
import { getGithubBranches } from "./get-github-branches.function";

interface Args {
  azureStorageHost: string | undefined;
  azureStorageContainer: string | undefined;
  azureSasToken: string | undefined;
  githubToken: string | undefined;
}

const args = minimist<Args>(process.argv.slice(2));

main(args.azureStorageHost, args.azureStorageContainer, args.azureSasToken, args.githubToken).catch((error) => {
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
  azureStorageHost: string | undefined,
  azureStorageContainer: string | undefined,
  azureAccountSas: string | undefined,
  githubToken: string | undefined,
) {
  if (!azureStorageHost || !azureStorageContainer || !azureAccountSas || !githubToken) {
    throw new Error(
      `Missing required variables: ${JSON.stringify({ azureStorageHost, azureStorageContainer, azureAccountSas, githubToken })}`,
    );
  }

  const blobServiceClient = new BlobServiceClient(`https://${azureStorageHost}/?${azureAccountSas}`);
  const containerClient = blobServiceClient.getContainerClient(azureStorageContainer);

  console.info("Updating versions");

  const gitBranches = await getGithubBranches(githubToken);
  const prefix = "dso-toolkit.nl/www/";
  const blobs = containerClient.listBlobsByHierarchy("/", { prefix });

  const branches = [];
  const tags = [];

  for await (const blob of blobs) {
    if (blob.kind === "prefix") {
      const name = blob.name.slice(prefix.length, blob.name.length - 1);

      if (name[0] === "_" && name[1] !== "_") {
        if (!gitBranches.find((branch) => branch.name === name)) {
          console.info(`Deleting branch ${name}`);

          const blobs = containerClient.listBlobsFlat({ prefix: blob.name });
          for await (const blob of blobs) {
            containerClient.getBlockBlobClient(blob.name).delete();
          }
        } else {
          branches.push(name);
        }
      } else if (valid(name)) {
        tags.push(name);
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

  containerClient.getBlockBlobClient(`${prefix}versions.json`).upload(versionsJson, versionsJson.length);

  console.info("Done updating versions");

  console.info("Updating index.html");

  const latestVersion = rsort(tags)[0];
  const indexHtmlContent = indexHtml(latestVersion);

  const body = collectResultSync(render(indexHtmlContent));

  containerClient.getBlockBlobClient(`${prefix}index.html`).upload(body, body.length);

  console.info("Done updating index.html");
}
