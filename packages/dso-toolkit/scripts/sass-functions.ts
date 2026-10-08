import { readFileSync } from "fs";
import { join } from "path";

import { SassString, types } from "sass-embedded";

/*
 * @stencil/sass (3.3.3) compiles with sass-embedded's LEGACY `render()` API: custom
 * functions receive one positional JS argument per declared Sass parameter, each
 * wrapped in a `sass.types.*` legacy value (`.getValue()` to read a string/number).
 * A Sass default value of `null` arrives as the real modern `SassNull`/`SassString`
 * instance instead (hence the `instanceof types.Null` check below).
 *
 * To stay compatible if `@stencil/sass` ever moves to the modern `compileString()`
 * API (where all arguments are passed as a single array of modern `Value`s with
 * `.assertString().text` / `.realNull`), both calling conventions are handled here.
 *
 * Returning a modern `SassString` works for both APIs, so construction doesn't need
 * to branch.
 */

const iconsDir = join(__dirname, "../src/icons");

function encodeSvg(svg: string): string {
  return svg
    .replace(/>\s+</g, "><")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/"/g, "'")
    .replace(/%/g, "%25")
    .replace(/#/g, "%23")
    .replace(/{/g, "%7B")
    .replace(/}/g, "%7D")
    .replace(/</g, "%3C")
    .replace(/>/g, "%3E");
}

interface LegacySassValue {
  getValue(): string;
}

interface ModernSassValue {
  assertString(name?: string): { text: string };
  realNull: ModernSassValue | null;
}

export function inlineIcon(...args: unknown[]): unknown {
  const first = args[0];

  let name: string;
  let color: string | undefined;

  if (Array.isArray(first)) {
    // Modern `compileString()` API: a single array of Values.
    const values = first as ModernSassValue[];

    name = values[0]!.assertString("name").text;
    color = values[1]?.realNull?.assertString("color").text;
  } else {
    // Legacy `render()` API: one positional argument per Sass parameter.
    name = (first as LegacySassValue).getValue();

    const colorArg = args[1];

    color = colorArg instanceof types.Null ? undefined : (colorArg as LegacySassValue | undefined)?.getValue();
  }

  let svg = readFileSync(join(iconsDir, `${name}.svg`), "utf8");

  if (color) {
    svg = svg.replaceAll("currentColor", color);
  }

  return new SassString(`url("data:image/svg+xml,${encodeSvg(svg)}")`, { quotes: false });
}

function getVersion(): string | undefined {
  if (process.env.DT_VERSION) {
    return process.env.DT_VERSION;
  }

  if (process.env.CI && process.env.DT_REF) {
    return process.env.DT_REF;
  }

  return undefined;
}

export function dsoToolkitVersion(): unknown {
  const version = getVersion();

  // Matches the gulp build's `replace("DSO_TOOLKIT_VERSION_REPLACEMENT_TOKEN", \`"${version}"\`)`:
  // when no version is known this intentionally becomes the literal string "undefined".
  // Interpolation (`#{dso-toolkit-version()}`) strips quotes from a quoted Sass string, so the
  // quote characters are included in an *unquoted* string instead to end up with the exact
  // same `--dso-toolkit-version: "<version>";` output as the gulp build produced.
  return new SassString(`"${version}"`, { quotes: false });
}
