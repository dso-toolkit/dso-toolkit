/**
 * This file:
 * 1. Removes all branch deploys whose git branch is deleted.
 * 2. Updates dso-toolkit.nl/versions.json with all the deployed releases (tags and branches) in the Azure Blob Storage container.
 * 3. Updates dso-toolkit.nl/index.html with the latest version.
 */

import { BlobClient, BlobItem, BlobServiceClient } from "@azure/storage-blob";
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
    // Redact the values to avoid leaking secrets but still show which ones are missing or empty
    const redacted = {
      azureStorageHost: !!azureStorageHost,
      azureStorageContainer: !!azureStorageContainer,
      azureAccountSas: !!azureAccountSas,
      githubToken: !!githubToken,
    };

    throw new Error(`Missing required variables. Started with: ${JSON.stringify(redacted, null, 2)}`);
  }

  const blobServiceClient = new BlobServiceClient(`https://${azureStorageHost}/?${azureAccountSas}`);
  const containerClient = blobServiceClient.getContainerClient(azureStorageContainer);
  const blobBatchClient = containerClient.getBlobBatchClient();

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
    const sitePrefix = `${siteRoot.path}/`;
    const siteBlobs = containerClient.listBlobsByHierarchy("/", { prefix: sitePrefix });

    for await (const siteBlob of siteBlobs) {
      if (siteBlob.kind === "prefix") {
        // dso-toolkit.nl/www/<NAME>/
        const name = siteBlob.name.slice(sitePrefix.length, siteBlob.name.length - 1);

        // Only directies starting with _ are considered branch deploys. The __bak directory was used for backups.
        if (name[0] === "_" && name[1] !== "_") {
          // if the branch does not exist on github, delete the branch deploy
          if (!gitBranches.find((branch) => branch.name === name)) {
            console.info(`Deleting branch deploy ${siteBlob.name}`);

            const blobs: Array<{ item: BlobItem; prefixDepth: number }> = [];

            for await (const blob of containerClient.listBlobsFlat({ prefix: siteBlob.name })) {
              blobs.push({ item: blob, prefixDepth: blob.name.split("/").length });
            }

            if (blobs.length > 0) {
              blobs.sort((a, b) => b.prefixDepth - a.prefixDepth);

              console.info(`Deleting ${blobs.length} blobs`);

              const batches = blobs
                .reduce<BlobClient[][]>((batches, { item }, index) => {
                  const reducedIndex = Math.floor(index / 256);
                  if (!batches[reducedIndex]) {
                    batches[reducedIndex] = [];
                  }

                  batches[reducedIndex].push(containerClient.getBlobClient(item.name));

                  return batches;
                }, [])
                .map((batch, index) => {
                  console.info(`Marking batch ${index + 1} for deletion`);

                  return blobBatchClient.deleteBlobs(batch);
                });

              await Promise.all(batches);

              console.info(`Done deleting ${blobs.length} blobs with ${batches.length} batches`);
            }

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

  containerClient.getBlockBlobClient(`${versionPrefix}/versions.json`).upload(versionsJson, versionsJson.length);

  console.info("Done updating versions");

  console.info("Updating index.html");

  const latestVersion = rsort(tags)[0];
  const indexHtmlContent = indexHtml(latestVersion);

  const document = collectResultSync(render(indexHtmlContent));

  containerClient.getBlockBlobClient(`${versionPrefix}/index.html`).upload(document, document.length);

  console.info("Done updating index.html");
}
