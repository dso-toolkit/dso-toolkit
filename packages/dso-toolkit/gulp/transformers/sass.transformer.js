import { readFileSync } from "fs";
import { join, relative } from "path";
import { fileURLToPath } from "url";

import PluginError from "plugin-error";
import { SassString, compileString } from "sass";
import { objectTransform } from "through2";
import applySourceMap from "vinyl-sourcemaps-apply";

const iconsDir = "src/icons";

function encodeSvg(svg) {
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

function inlineIcon(args) {
  const name = args[0].assertString("name").text;
  const color = args[1].assertString("color").text;

  const svg = readFileSync(join(iconsDir, `${name}.svg`), "utf8").replaceAll("currentColor", color);

  return new SassString(`url("data:image/svg+xml,${encodeSvg(svg)}")`, { quotes: false });
}

export function sassTransformer() {
  return objectTransform((file, _enc, cb) => {
    try {
      const { css, sourceMap } = compileString(file.contents.toString(), {
        url: `file:${file.path}`,
        sourceMap: true,
        style: "expanded",
        verbose: true,
        functions: {
          "inline-icon-DI-ONLY($name, $color)": inlineIcon,
        },
      });

      file.contents = Buffer.from(css);
      file.extname = ".css";

      sourceMap.sources = sourceMap.sources.map((source) => {
        const path = fileURLToPath(source);

        return relative(file.base, path);
      });

      sourceMap.file = file.relative;

      applySourceMap(file, sourceMap);

      cb(null, file);
    } catch (error) {
      cb(new PluginError("sassTransformer()", error));
    }
  });
}
