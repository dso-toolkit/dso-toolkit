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

import { indexHtml } from "./index-html";

interface Args {
  azureStorageHost: string | undefined;
  azureStorageContainer: string | undefined;
  sasToken: string | undefined;
}

const args = minimist<Args>(process.argv.slice(2));

main(args.azureStorageHost, args.azureStorageContainer, args.sasToken).catch((error) => {
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
  storageHost: string | undefined,
  storageContainer: string | undefined,
  accountSas: string | undefined,
) {
  if (!storageHost || !storageContainer || !accountSas) {
    throw new Error("Missing required variables");
  }

  console.info(`Updating versions.json`);

  const blobServiceClient = new BlobServiceClient(`https://${storageHost}/?${accountSas}`);

  const containerClient = blobServiceClient.getContainerClient(storageContainer);

  const prefix = "dso-toolkit.nl/www/";
  const blobs = containerClient.listBlobsByHierarchy("/", { prefix });

  const branches = [];
  const tags = [];

  for await (const blob of blobs) {
    if (blob.kind === "prefix") {
      const name = blob.name.slice(prefix.length, blob.name.length - 1);

      if (name[0] === "_" && name[1] !== "_") {
        branches.push(name);
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

  console.info(`Updated versions.json`);

  console.info(`Updating index.html`);

  const latestVersion = rsort(tags)[0];

  const indexHtmlContent = indexHtml(latestVersion);

  const body = collectResultSync(render(indexHtmlContent));

  containerClient.getBlockBlobClient(`${prefix}index.html`).upload(body, body.length);

  console.info(`Updated index.html`);
}
