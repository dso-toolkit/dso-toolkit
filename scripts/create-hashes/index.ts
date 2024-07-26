import readline from "node:readline";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

interface InputLine {
  location?: string;
  base?: string;
}

interface HashRecord {
  base?: string;
  file?: string;
  sha384?: string;
  sha512?: string;
}

main().catch((error) => {
  console.error(error);

  process.exit(1);
});

function createFileHash(algorithm: string, filename: string, base: string) {
  const file_buffer = readFileSync(`${base}/${filename}`);
  const hash = createHash(algorithm);

  hash.update(file_buffer);
  return btoa(hash.digest("binary"));
}

function includeFile(filename: string) {
  const ignoreThese = [".scss", "readme.md", "README.md", "CHANGELOG.md", "DISCLAIMER.txt", ".d.ts"];

  let result = true;
  for (const ignore of ignoreThese) {
    if (filename.endsWith(ignore)) {
      result = false;
      break;
    }
  }

  return result;
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

    if (inputLine.base) {
      // base is the first ndjson line
      base = inputLine.base;
    } else if (base && inputLine.location && includeFile(inputLine.location)) {
      const hash: HashRecord = {
        file: inputLine.location,
        sha384: createFileHash("sha384", inputLine.location, base),
        sha512: createFileHash("sha512", inputLine.location, base),
      };
      hashes.push(hash);
    }
  }

  process.stdout.write(JSON.stringify(hashes, null, 2));
}
