import { execSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import { writeFile } from "node:fs/promises";
import path from "node:path";

interface HashRecord {
  file: string;
  sha384: string;
  sha512: string;
}

interface PnpmPackOutput {
  files: { path: string }[];
}

function createFileHash(algorithm: string, filename: string, base: string) {
  const fileBuffer = fs.readFileSync(path.join(base, filename));
  const hash = crypto.createHash(algorithm);

  hash.update(fileBuffer);
  return btoa(hash.digest("binary"));
}

const excludes = [".scss", "readme.md", "README.md", "CHANGELOG.md", "DISCLAIMER.txt", ".d.ts"];
function includeFile(filename: string) {
  return excludes.every((exclude) => !filename.endsWith(exclude));
}

async function main() {
  const filter = process.argv[2];

  if (!filter) {
    throw new Error("Missing package filter argument. Usage: tsx scripts/create-hashes <filter>");
  }

  const base = execSync(`pnpm --filter ${filter} exec pwd`).toString().trim();
  const json = execSync(`pnpm --filter ${filter} pack --dry-run --json`).toString();
  const { files }: PnpmPackOutput = JSON.parse(json);

  const hashes: HashRecord[] = files
    .filter(({ path: filePath }) => includeFile(filePath))
    .map(({ path: filePath }) => ({
      file: filePath,
      sha384: createFileHash("sha384", filePath, base),
      sha512: createFileHash("sha512", filePath, base),
    }));

  await writeFile(path.join(base, "hashes.json"), JSON.stringify(hashes, null, 2));
}

main().catch((error) => {
  console.error(error);

  process.exit(1);
});
