import gulp from "gulp";
import filter from "gulp-filter";
import header from "gulp-header";
import postcss from "gulp-postcss";
import rename from "gulp-rename";

import { plugins } from "../postcss.config.js";
import { sassTransformer } from "./transformers/sass.transformer.js";

function getVersion() {
  if (process.env.DT_VERSION) {
    return process.env.DT_VERSION;
  }

  if (process.env.CI) {
    if (typeof process.env.TRAVIS_TAG === "string" && process.env.TRAVIS_TAG[0] === "v") {
      return process.env.TRAVIS_TAG.substring(1);
    }

    if (
      typeof process.env.TRAVIS_BRANCH === "string" &&
      (process.env.TRAVIS_BRANCH[0] === "#" || process.env.TRAVIS_BRANCH === "master")
    ) {
      return process.env.TRAVIS_BRANCH.replace(/#/, "_");
    }
  }

  return undefined;
}

export function buildStyling() {
  const version = getVersion();

  return gulp
    .src("src/dso.scss", { sourcemaps: true })
    .pipe(sassTransformer())
    .pipe(
      header(
        [`/* DSO Toolkit version: ${version} */`, `:root { --dso-toolkit-version: ${version} }`, "", ""].join("\n"),
      ),
    )
    .pipe(gulp.dest("dist", { sourcemaps: "." }))
    .pipe(filter("dso.css"))
    .pipe(postcss(plugins))
    .pipe(rename("dso.min.css"))
    .pipe(gulp.dest("dist", { sourcemaps: "." }));
}
