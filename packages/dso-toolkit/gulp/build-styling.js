import postcss from "gulp-postcss";
import gulp from "gulp";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";
import filter from "gulp-filter";
import dartSass from "sass";

import { plugins } from "../postcss.config.js";

const sass = gulpSass(dartSass);

export function buildStyling() {
  const sassCompiler = sass().on("error", sass.logError);

  return gulp
    .src("src/dso.scss", { sourcemaps: true })
    .pipe(sassCompiler)
    .pipe(gulp.dest("dist", { sourcemaps: "." }))
    .pipe(filter("dso.css"))
    .pipe(postcss(plugins))
    .pipe(rename("dso.min.css"))
    .pipe(gulp.dest("dist", { sourcemaps: "." }));
}
