import { readFile, writeFile } from "fs/promises";

import minimist from "minimist";
import * as prettier from "prettier";

interface Args {
  version: string | undefined;
  emoji: string | undefined;
}

const args = minimist<Args>(process.argv.slice(2));

main(args.version, args.emoji).catch((error) => {
  console.error(error);

  process.exit(1);
});

async function main(version: string | undefined, emoji: string | undefined) {
  if (!version) {
    throw new Error("No version provided");
  }

  await updatePackageJsons(version);
  await updateChangelog(version, emoji);
}

async function updatePackageJsons(version: string) {
  const packagePaths = [
    "packages/dso-toolkit",
    "packages/core",
    "packages/react",
    "angular-workspace/projects/component-library",
  ];

  for (const packagePath of packagePaths) {
    const packageJson = JSON.parse(await readFile(`${packagePath}/package.json`, "utf-8"));

    packageJson.version = version;

    if (packageJson.peerDependencies?.["@dso-toolkit/core"]) {
      packageJson.peerDependencies["@dso-toolkit/core"] = version;
    }
    if (packageJson.peerDependencies?.["dso-toolkit"]) {
      packageJson.peerDependencies["dso-toolkit"] = version;
    }

    await writeFile(
      `${packagePath}/package.json`,
      await format(JSON.stringify(packageJson, null, 2), `${packagePath}/package.json`),
    );
  }
}

async function updateChangelog(version: string, emoji: string | undefined) {
  if (!emoji) {
    throw new Error("No emoji provided");
  }

  const changelog = await readFile("CHANGELOG.md", "utf-8");

  const lines = changelog.split("\n");

  const releasePlaceholderIndex = lines.findIndex((line) => line.startsWith("## Next"));

  if (releasePlaceholderIndex === -1) {
    throw new Error("No release placeholder found");
  }

  lines.splice(
    releasePlaceholderIndex + 2,
    0,
    `## ${emoji} Release ${version} - ${new Date().toISOString().slice(0, 10)}`,
    "",
  );

  await writeFile("CHANGELOG.md", lines.join("\n"));
}

async function format(content: string, filepath: string) {
  return prettier.format(content, {
    ...(await prettier.resolveConfig(filepath)),
    filepath,
  });
}
