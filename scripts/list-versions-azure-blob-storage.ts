/* eslint-disable no-console -- cli script, needs to output to stdout */

import { BlobServiceClient } from "@azure/storage-blob";
import { valid, sort } from "semver";

async function main(
  storageHost: string | undefined,
  storageContainer: string | undefined,
  accountSas: string | undefined,
) {
  if (!storageHost || !storageContainer || !accountSas) {
    throw new Error("Missing required variables");
  }

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

  const versions = {
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

  console.log(JSON.stringify(versions, null, 2));
}

main(process.env.DT_AZURE_STORAGE_HOST, process.env.DT_AZURE_STORAGE_CONTAINER, process.env.SAS_TOKEN).catch(
  (error) => {
    console.error(error);
    process.exit(1);
  },
);
