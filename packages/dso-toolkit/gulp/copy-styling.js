const gulp = require('gulp');
const { dirname, resolve } = require('path');

module.exports = {
  copyStyling
};

function copyStyling() {
  const stylingDir = resolve(dirname(require.resolve('@dso-toolkit/styling')), '**/*.scss');
  
  return gulp.src(stylingDir)
    .pipe(gulp.dest('libs/@dso-toolkit/styling'))
}
