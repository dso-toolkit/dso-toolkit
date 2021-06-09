const gulp = require('gulp');
const { resolve } = require('path');

module.exports = {
  copyLibs: gulp.parallel(copySources, copyCss)
};

function copySources() {
  const stylingDir = resolve(__dirname, '../../sources/src', '**/*.{scss,svg}');

  return gulp.src(stylingDir)
    .pipe(gulp.dest('libs/@dso-toolkit/sources/src'));
}

function copyCss() {
  const stylingDir = resolve(__dirname, '../../css', '**/*.{scss,svg}');

  return gulp.src(stylingDir)
    .pipe(gulp.dest('libs/@dso-toolkit/css'));
}
