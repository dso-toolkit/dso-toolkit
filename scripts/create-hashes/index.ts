import crypto from "node:crypto";
import fs from "node:fs";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import readline from "node:readline";

interface InputLine {
  location?: string;
  base?: string;
}

interface HashRecord {
  file: string;
  sha384: string;
  sha512: string;
}

main().catch((error) => {
  console.error(error);

  process.exit(1);
});

function createFileHash(algorithm: string, filename: string, base: string) {
  const fileBuffer = fs.readFileSync(path.join(base, filename));
  const hash = crypto.createHash(algorithm);

  hash.update(fileBuffer);
  return btoa(hash.digest("binary"));
}

function includeFile(filename: string) {
  return [".scss", "readme.md", "README.md", "CHANGELOG.md", "DISCLAIMER.txt", ".d.ts"].every(
    (exclude) => !filename.endsWith(exclude),
  );
}

async function main() {
  const hashes: HashRecord[] = [];
  let base;
  const rl = readline.createInterface({
    input: process.stdin,
  });

  for await (const line of rl) {
    // process a line at a time
    const inputLine: InputLine = JSON.parse(line);

    if (inputLine.base && !base) {
      // base is the first ndjson line
      base = inputLine.base;
    } else if (base && inputLine.location) {
      const exists = fs.existsSync(path.join(base, inputLine.location));
      if (includeFile(inputLine.location) && exists) {
        hashes.push({
          file: inputLine.location,
          sha384: createFileHash("sha384", inputLine.location, base),
          sha512: createFileHash("sha512", inputLine.location, base),
        });
      } else if (!exists) {
        console.info(`File ${path.join(base, inputLine.location)} not found!`);
      }
    } else {
      throw new Error("Wrong STDIN order!");
    }
  }

  if (base) {
    await writeFile(path.join(base, "hashes.json"), JSON.stringify(hashes, null, 2));
  } else {
    throw new Error("Base path not found!");
  }
}
