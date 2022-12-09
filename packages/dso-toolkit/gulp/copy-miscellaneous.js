import gulp from "gulp";

export function copyMiscellaneous() {
  return gulp.src(["../../README.md", "../../CHANGELOG.md"]).pipe(gulp.dest("."));
}
