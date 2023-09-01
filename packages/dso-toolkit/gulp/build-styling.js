import gulp from "gulp";
import filter from "gulp-filter";
import header from "gulp-header";
import postcss from "gulp-postcss";
import rename from "gulp-rename";
import gulpSass from "gulp-sass";
import * as dartSass from "sass";

import { plugins } from "../postcss.config.js";

import { version } from "./version.js";

const sass = gulpSass(dartSass);

export function buildStyling() {
  const sassCompiler = sass().on("error", sass.logError);

  return gulp
    .src("src/dso.scss", { sourcemaps: true })
    .pipe(sassCompiler)
    .pipe(
      header(
        [`/* DSO Toolkit version: ${version} */`, `:root { --dso-toolkit-version: ${version} }`, "", ""].join("\n")
      )
    )
    .pipe(gulp.dest("dist", { sourcemaps: "." }))
    .pipe(filter("dso.css"))
    .pipe(postcss(plugins))
    .pipe(rename("dso.min.css"))
    .pipe(gulp.dest("dist", { sourcemaps: "." }));
}
