/**
 * "Afnemer-simulatie in de straat" for the `dso-toolkit` package (#3931).
 *
 * This script does NOT test the monorepo source; it packs `dso-toolkit` the same way `npm
 * publish` would (`pnpm --filter dso-toolkit pack`), unpacks that tarball into a throwaway
 * fixture `node_modules/dso-toolkit`, and then probes the *published* package surface exactly
 * like an external consumer would: by resolving `exports` subpaths, requiring/importing the
 * package, compiling its sass variables, and asserting deep imports outside of `exports` are
 * blocked.
 *
 * Network is avoided: the fixture's `node_modules` only contains `dso-toolkit` (from the pack)
 * plus symlinks to `packages/dso-toolkit`'s own already-installed runtime dependencies
 * (`@stencil/core`, `clsx`, `sass-embedded`, ...). `NODE_PATH` does not work reliably for ESM
 * resolution, so symlinking real `node_modules` entries into the fixture is the robust,
 * offline-friendly option.
 *
 * Node.js cannot instantiate Stencil custom elements (`ReferenceError: HTMLElement/
 * ResizeObserver/customElements is not defined` - there is no DOM). Where a runtime
 * `import()`/`require()` fails for that reason specifically, this script falls back to a
 * static check: the subpath resolves AND its compiled source text contains the expected
 * exported identifier. Every fallback is logged explicitly so it's clear which checks are
 * "real" runtime checks and which are the static fallback.
 */
import { execFileSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { NodePackageImporter, compileString } from "sass-embedded";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "../..");
const pkgDir = join(repoRoot, "packages/dso-toolkit");

interface CheckResult {
  name: string;
  ok: boolean;
  detail: string;
}

const results: CheckResult[] = [];

function record(name: string, ok: boolean, detail = ""): void {
  results.push({ name, ok, detail });
  const icon = ok ? "✅" : "❌";
  console.info(`${icon} ${name}${detail ? ` — ${detail}` : ""}`);
}

function run(cmd: string, args: string[], options: Parameters<typeof execFileSync>[2] = {}): string {
  return execFileSync(cmd, args, { encoding: "utf-8", ...options });
}

async function main(): Promise<void> {
  const workDir = mkdtempInsideRepo();

  try {
    console.info(`\n== consumer-check: working directory ${workDir} ==\n`);

    const packageDir = packAndExtract(workDir);
    const consumerDir = setUpFixture(workDir, packageDir);

    checkCssOutput(packageDir);
    checkSassPkgImporter(consumerDir);
    checkSassLoadPaths(consumerDir);

    const esmProbe = runEsmProbe(consumerDir);
    applyEsmProbeResults(esmProbe);

    const cjsProbe = runCjsProbe(consumerDir);
    applyCjsProbeResults(cjsProbe);
  } finally {
    rmSync(workDir, { recursive: true, force: true });
  }

  console.info("\n== consumer-check summary ==");
  const failed = results.filter((r) => !r.ok);
  console.info(`${results.length - failed.length}/${results.length} checks passed.`);

  if (failed.length > 0) {
    console.error(`\n${failed.length} check(s) failed:`);
    for (const f of failed) {
      console.error(`  - ${f.name}: ${f.detail}`);
    }
    process.exitCode = 1;
  }
}

function mkdtempInsideRepo(): string {
  const base = join(repoRoot, ".consumer-check");
  mkdirSync(base, { recursive: true });
  return mkdtempSync(join(base, "run-"));
}

function packAndExtract(workDir: string): string {
  const packDir = join(workDir, "pack");
  mkdirSync(packDir, { recursive: true });

  console.info("Packing dso-toolkit (pnpm --filter dso-toolkit pack)...");
  run("pnpm", ["--filter", "dso-toolkit", "pack", "--pack-destination", packDir], { cwd: repoRoot, stdio: "pipe" });

  const tgz = readdirSync(packDir).find((f) => f.endsWith(".tgz"));
  if (!tgz) {
    throw new Error(`consumer-check: pnpm pack did not produce a .tgz file in ${packDir}`);
  }

  const extractDir = join(workDir, "extracted");
  mkdirSync(extractDir, { recursive: true });
  run("tar", ["-xzf", join(packDir, tgz), "-C", extractDir]);

  return join(extractDir, "package");
}

/** Sets up a throwaway consumer project with `node_modules/dso-toolkit` being the packed/extracted package. */
function setUpFixture(workDir: string, packageDir: string): string {
  const consumerDir = join(workDir, "consumer");
  const nodeModulesDir = join(consumerDir, "node_modules");
  mkdirSync(nodeModulesDir, { recursive: true });

  // Copy (not symlink) the extracted package into the fixture's node_modules: Node resolves
  // bare specifiers (`require("@stencil/core")`) relative to the *real* path of the importing
  // file, so a symlink pointing outside `consumer/` would make Node search for `node_modules`
  // upward from the pack's extraction directory instead of from the fixture - missing the
  // dependency symlinks set up below.
  cpSync(packageDir, join(nodeModulesDir, "dso-toolkit"), { recursive: true });

  writeFileSync(
    join(consumerDir, "package.json"),
    JSON.stringify({ name: "consumer-check-fixture", private: true, type: "module" }, undefined, 2),
  );

  // Resolve dso-toolkit's own runtime dependencies (@stencil/core, clsx, sass-embedded, ...)
  // offline by symlinking the already-installed packages from packages/dso-toolkit/node_modules
  // into the fixture's node_modules. This avoids any network access during the check.
  const sourceNodeModules = join(pkgDir, "node_modules");
  for (const entry of readdirSync(sourceNodeModules, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) {
      continue;
    }

    if (entry.name.startsWith("@")) {
      const scopeDir = join(sourceNodeModules, entry.name);
      const targetScopeDir = join(nodeModulesDir, entry.name);
      mkdirSync(targetScopeDir, { recursive: true });

      for (const scopedEntry of readdirSync(scopeDir, { withFileTypes: true })) {
        const linkPath = join(targetScopeDir, scopedEntry.name);
        if (!existsSync(linkPath)) {
          symlinkSync(join(scopeDir, scopedEntry.name), linkPath, "dir");
        }
      }
      continue;
    }

    const linkPath = join(nodeModulesDir, entry.name);
    if (!existsSync(linkPath)) {
      symlinkSync(join(sourceNodeModules, entry.name), linkPath, "dir");
    }
  }

  return consumerDir;
}

function checkCssOutput(packageDir: string): void {
  const cssPath = join(packageDir, "dist/dso.css");

  if (!existsSync(cssPath)) {
    record("dist/dso.css bestaat", false, "bestand ontbreekt");
    return;
  }
  record("dist/dso.css bestaat", true);

  const css = readFileSync(cssPath, "utf-8");
  record("dist/dso.css bevat --dso-toolkit-version", css.includes("--dso-toolkit-version"));
  record("dist/dso.css bevat geen sourceMappingURL", !css.includes("sourceMappingURL"));

  record("dist/dso.min.css bestaat niet (vervallen)", !existsSync(join(packageDir, "dist/dso.min.css")));
  record("dist/dso.css.map bestaat niet (vervallen)", !existsSync(join(packageDir, "dist/dso.css.map")));
  record("dist/dso.min.css.map bestaat niet (vervallen)", !existsSync(join(packageDir, "dist/dso.min.css.map")));
}

function checkSassPkgImporter(consumerDir: string): void {
  try {
    const result = compileString('@use "pkg:dso-toolkit/variables/colors" as colors;\n.probe { color: colors.$wit; }', {
      importers: [new NodePackageImporter(consumerDir)],
      url: new URL(`file://${join(consumerDir, "probe.scss")}`),
    });
    record(
      'sass @use "pkg:dso-toolkit/variables/colors" (NodePackageImporter)',
      result.css.includes(".probe"),
      result.css.includes(".probe") ? "" : "compileerde, maar output bevat de verwachte regel niet",
    );
  } catch (error) {
    record('sass @use "pkg:dso-toolkit/variables/colors" (NodePackageImporter)', false, String(error));
  }
}

function checkSassLoadPaths(consumerDir: string): void {
  try {
    const result = compileString('@use "dso-toolkit/src/variables/colors" as colors;\n.probe { color: colors.$wit; }', {
      loadPaths: [join(consumerDir, "node_modules")],
    });
    record(
      'sass @use "dso-toolkit/src/variables/colors" (loadPaths)',
      result.css.includes(".probe"),
      result.css.includes(".probe") ? "" : "compileerde, maar output bevat de verwachte regel niet",
    );
  } catch (error) {
    record('sass @use "dso-toolkit/src/variables/colors" (loadPaths)', false, String(error));
  }
}

interface ProbeResult {
  resolvable: Record<string, { ok: boolean; detail: string }>;
  mustFail: Record<string, { ok: boolean; detail: string }>;
  rootImport: { ok: boolean; staticFallback: boolean; detail: string };
  loaderImport: { ok: boolean; staticFallback: boolean; detail: string };
}

function runEsmProbe(consumerDir: string): ProbeResult {
  const probePath = join(consumerDir, "probe-esm.mjs");
  writeFileSync(probePath, ESM_PROBE_SOURCE);
  const stdout = run("node", [probePath], { cwd: consumerDir });
  return JSON.parse(stdout) as ProbeResult;
}

function applyEsmProbeResults(probe: ProbeResult): void {
  for (const [specifier, result] of Object.entries(probe.resolvable)) {
    record(`exports resolvet (ESM): ${specifier}`, result.ok, result.detail);
  }

  for (const [specifier, result] of Object.entries(probe.mustFail)) {
    record(`deep import FAALT terecht: ${specifier}`, result.ok, result.detail);
  }

  record(
    'import("dso-toolkit") exporteert defineCustomElementDsoBadge',
    probe.rootImport.ok,
    probe.rootImport.staticFallback
      ? `statische export-scan (runtime-import faalde op ontbrekende DOM-API) — ${probe.rootImport.detail}`
      : probe.rootImport.detail,
  );

  record(
    'import("dso-toolkit/loader") exporteert defineCustomElements',
    probe.loaderImport.ok,
    probe.loaderImport.staticFallback
      ? `statische export-scan (runtime-import faalde op ontbrekende DOM-API) — ${probe.loaderImport.detail}`
      : probe.loaderImport.detail,
  );
}

interface CjsProbeResult {
  requireRoot: { ok: boolean; detail: string };
  requireLoader: { ok: boolean; detail: string };
  requireResolveRoot: { ok: boolean; detail: string };
  requireResolveLoader: { ok: boolean; detail: string };
}

function runCjsProbe(consumerDir: string): CjsProbeResult {
  const probePath = join(consumerDir, "probe-cjs.cjs");
  writeFileSync(probePath, CJS_PROBE_SOURCE);
  const stdout = run("node", [probePath], { cwd: consumerDir });
  return JSON.parse(stdout) as CjsProbeResult;
}

function applyCjsProbeResults(probe: CjsProbeResult): void {
  record('require("dso-toolkit")', probe.requireRoot.ok, probe.requireRoot.detail);
  record('require("dso-toolkit/loader")', probe.requireLoader.ok, probe.requireLoader.detail);
  record('require.resolve("dso-toolkit")', probe.requireResolveRoot.ok, probe.requireResolveRoot.detail);
  record('require.resolve("dso-toolkit/loader")', probe.requireResolveLoader.ok, probe.requireResolveLoader.detail);
}

const ESM_PROBE_SOURCE = `
const resolvableSpecifiers = [
  "dso-toolkit",
  "dso-toolkit/loader",
  "dso-toolkit/dist/components",
  "dso-toolkit/dist/components/dso-badge.js",
  "dso-toolkit/dist/bundle",
  "dso-toolkit/dist/bundle/dso-badge.js",
  "dso-toolkit/dist/dso.css",
  "dso-toolkit/src/variables/colors.scss",
  "dso-toolkit/variables/colors",
  "dso-toolkit/assets/favicon.ico",
  "dso-toolkit/package.json",
];

const mustFailSpecifiers = [
  "dso-toolkit/dist/collection/index.js",
  "dso-toolkit/src/components/badge/badge.tsx",
];

function isDomReferenceError(error) {
  return (
    error instanceof ReferenceError &&
    /\\b(HTMLElement|ResizeObserver|customElements|document|window)\\b/.test(error.message)
  );
}

async function main() {
  const resolvable = {};
  for (const specifier of resolvableSpecifiers) {
    try {
      await import.meta.resolve(specifier);
      resolvable[specifier] = { ok: true, detail: "" };
    } catch (error) {
      resolvable[specifier] = { ok: false, detail: String(error && error.message ? error.message : error) };
    }
  }

  const mustFail = {};
  for (const specifier of mustFailSpecifiers) {
    try {
      await import.meta.resolve(specifier);
      mustFail[specifier] = { ok: false, detail: "resolved, but exports should have blocked this deep import" };
    } catch (error) {
      mustFail[specifier] = { ok: true, detail: String(error && error.message ? error.message : error) };
    }
  }

  const rootImport = { ok: false, staticFallback: false, detail: "" };
  try {
    const mod = await import("dso-toolkit");
    rootImport.ok = typeof mod.defineCustomElementDsoBadge === "function";
    rootImport.detail = rootImport.ok ? "" : "module loaded, but defineCustomElementDsoBadge missing";
  } catch (error) {
    if (isDomReferenceError(error)) {
      try {
        const resolved = await import.meta.resolve("dso-toolkit");
        const { readFileSync } = await import("node:fs");
        const { fileURLToPath } = await import("node:url");
        const source = readFileSync(fileURLToPath(resolved), "utf-8");
        rootImport.ok = /defineCustomElement\\s+as\\s+defineCustomElementDsoBadge|defineCustomElementDsoBadge/.test(source);
        rootImport.staticFallback = true;
        rootImport.detail = rootImport.ok ? "" : "defineCustomElementDsoBadge niet gevonden in broncode";
      } catch (fallbackError) {
        rootImport.detail = String(fallbackError);
      }
    } else {
      rootImport.detail = String(error && error.message ? error.message : error);
    }
  }

  const loaderImport = { ok: false, staticFallback: false, detail: "" };
  try {
    const mod = await import("dso-toolkit/loader");
    loaderImport.ok = typeof mod.defineCustomElements === "function";
    loaderImport.detail = loaderImport.ok ? "" : "module loaded, but defineCustomElements missing";
  } catch (error) {
    if (isDomReferenceError(error)) {
      try {
        const resolved = await import.meta.resolve("dso-toolkit/loader");
        const { readFileSync } = await import("node:fs");
        const { fileURLToPath } = await import("node:url");
        const source = readFileSync(fileURLToPath(resolved), "utf-8");
        loaderImport.ok = /defineCustomElements/.test(source);
        loaderImport.staticFallback = true;
        loaderImport.detail = loaderImport.ok ? "" : "defineCustomElements niet gevonden in broncode";
      } catch (fallbackError) {
        loaderImport.detail = String(fallbackError);
      }
    } else {
      loaderImport.detail = String(error && error.message ? error.message : error);
    }
  }

  process.stdout.write(JSON.stringify({ resolvable, mustFail, rootImport, loaderImport }));
}

main();
`;

const CJS_PROBE_SOURCE = `
function toResult(fn) {
  try {
    fn();
    return { ok: true, detail: "" };
  } catch (error) {
    return { ok: false, detail: String(error && error.message ? error.message : error) };
  }
}

const requireRoot = toResult(() => require("dso-toolkit"));
const requireLoader = toResult(() => require("dso-toolkit/loader"));
const requireResolveRoot = toResult(() => require.resolve("dso-toolkit"));
const requireResolveLoader = toResult(() => require.resolve("dso-toolkit/loader"));

process.stdout.write(JSON.stringify({ requireRoot, requireLoader, requireResolveRoot, requireResolveLoader }));
`;

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
