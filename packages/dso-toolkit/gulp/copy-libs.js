const gulp = require('gulp');
const { dirname, resolve } = require('path');

module.exports = {
  copyLibs: gulp.parallel(copyStyling, copyCss)
};

function copyStyling() {
  const stylingDir = resolve(__dirname, '../../styling', '**/*.scss');

  return gulp.src(stylingDir)
    .pipe(gulp.dest('libs/@dso-toolkit/styling'))
}

function copyCss() {
  const cssDir = resolve(__dirname, '../../css', '**/*.scss');

  return gulp.src(cssDir)
    .pipe(gulp.dest('libs/@dso-toolkit/css'))
}
