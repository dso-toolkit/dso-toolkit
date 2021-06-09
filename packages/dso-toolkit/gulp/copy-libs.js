const gulp = require('gulp');
const { resolve } = require('path');

module.exports = {
  copyLibs: gulp.parallel(copySources)
};

function copySources() {
  const stylingDir = resolve(__dirname, '../../sources/src', '**/*.{scss,svg}');

  return gulp.src(stylingDir)
    .pipe(gulp.dest('libs/@dso-toolkit/sources/src'))
}
