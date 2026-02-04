import gulp from "gulp";
import filter from "gulp-filter";
import postcss from "gulp-postcss";
import rename from "gulp-rename";
import stylelint from "gulp-stylelint-esm";

import { plugins } from "../postcss.config.js";

import { sassTransformer } from "./transformers/sass.transformer.js";

function getVersion() {
  if (process.env.DT_VERSION) {
    return process.env.DT_VERSION;
  }

  if (process.env.CI && process.env.DT_REF) {
    return process.env.DT_REF;
  }

  return undefined;
}

export function buildStyling() {
  const version = getVersion();

  return gulp
    .src("src/dso.scss", { sourcemaps: true })
    .pipe(sassTransformer())
    .pipe(
      postcss([
        (root) => {
          const token = /DSO_TOOLKIT_VERSION_REPLACEMENT_TOKEN/g;
          const replacement = `"${version}"`;

          const replaceToken = (str) =>
            str?.includes("DSO_TOOLKIT_VERSION_REPLACEMENT_TOKEN") ? str.replace(token, replacement) : str;

          root.walkDecls((decl) => {
            decl.value = replaceToken(decl.value);
          });
          root.walkRules((rule) => {
            rule.selector = replaceToken(rule.selector);
          });
          root.walkAtRules((atRule) => {
            atRule.params = replaceToken(atRule.params);
          });
          root.walkComments((comment) => {
            comment.text = replaceToken(comment.text);
          });
        },
      ]),
    )
    .pipe(gulp.dest("dist", { sourcemaps: "." }))
    .pipe(filter("dso.css"))
    .pipe(
      stylelint({
        config: {
          rules: {
            "block-no-empty": true,
            "color-no-invalid-hex": true,
            "declaration-block-no-duplicate-properties": true,
            "no-invalid-position-at-import-rule": true,
            "property-no-unknown": true,
            "selector-pseudo-class-no-unknown": true,
            "selector-pseudo-element-no-unknown": true,
            "no-empty-source": true,
            "unit-no-unknown": true,
          },
          defaultSeverity: "error",
        },
      }),
    )
    .pipe(postcss(plugins))
    .pipe(rename("dso.min.css"))
    .pipe(gulp.dest("dist", { sourcemaps: "." }));
}
