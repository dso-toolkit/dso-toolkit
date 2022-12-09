import gulp from "gulp";
import gulpSass from "gulp-sass";
import dartSass from "sass";

const sass = gulpSass(dartSass);

export function buildStyling() {
  const sassCompiler = sass().on("error", sass.logError);

  return gulp.src(`src/dso.scss`).pipe(sassCompiler).pipe(gulp.dest("dist"));
}
