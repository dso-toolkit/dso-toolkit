import { existsSync, renameSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/*
 * `package.json` declares `"type": "module"` (needed so bundlers treat `dist/components/*.js`,
 * `dist/esm/*` etc. as ESM by default). Stencil's CommonJS fallbacks (`dist/index.cjs.js`,
 * `loader/index.cjs.js` and everything under `dist/cjs/`) are plain CommonJS (`require`/
 * `module.exports`), but Node.js decides module format per *file extension + nearest
 * package.json `type` field*, not by filename convention. A `.js` file under a `"type":
 * "module"` package is therefore loaded through Node's ESM pipeline; when it is required
 * instead of imported, Node's CommonJS/ESM interop ("require(esm)") only partially supports
 * this and silently breaks relative `require(...)` calls between the chunked CJS files that
 * Stencil's rollup output produces (`Cannot find module './chunk-x.js'` even though the file
 * exists) - see #3931 consumer-check findings.
 *
 * Fix:
 *  - rename the two CJS entry points to the unambiguous `.cjs` extension, which Node always
 *    treats as CommonJS regardless of `"type"`;
 *  - drop a `dist/cjs/package.json` with `"type": "commonjs"` so the nearest package.json for
 *    every chunk Stencil writes under `dist/cjs/` overrides the root `"type": "module"`.
 *
 * Without this, `require("dso-toolkit")` and `require("dso-toolkit/loader")` throw from plain
 * CommonJS consumers.
 */
const distDir = join(__dirname, "../dist");
const loaderDir = join(__dirname, "../loader");

function renameCjsJsToCjs(dir: string, base: string): void {
  const from = join(dir, `${base}.cjs.js`);
  const to = join(dir, `${base}.cjs`);

  if (existsSync(from)) {
    renameSync(from, to);
  } else if (!existsSync(to)) {
    throw new Error(`fix-cjs-output: expected ${from} to exist after the Stencil build.`);
  }
}

renameCjsJsToCjs(distDir, "index");
renameCjsJsToCjs(loaderDir, "index");

const cjsChunksDir = join(distDir, "cjs");

if (existsSync(cjsChunksDir)) {
  writeFileSync(join(cjsChunksDir, "package.json"), JSON.stringify({ type: "commonjs" }, undefined, 2) + "\n");
} else {
  throw new Error(`fix-cjs-output: expected ${cjsChunksDir} to exist after the Stencil build.`);
}
