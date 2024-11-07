import { compileString } from "sass";
import { obj } from "through2";
import PluginError from "plugin-error";
import { fileURLToPath } from "url";
import { relative } from "path";
import applySourceMap from "vinyl-sourcemaps-apply";

export function sassTransformer() {
  return obj((file, _enc, cb) => {
    try {
      const { css, sourceMap } = compileString(file.contents.toString(), {
        url: `file:${file.path}`,
        sourceMap: true,
        style: "expanded",
        verbose: true,
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
