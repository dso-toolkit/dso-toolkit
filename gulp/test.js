/* eslint-env node */

const gulp = require('gulp');

const access = require('gulp-accessibility');
const rename = require('gulp-rename');
const del = require('del');

module.exports = {
  accessibility
};
module.exports.test = gulp.series(clean, module.exports.accessibility);

function clean() {
  return del('wcag');
}

function accessibility() {
  let a = access({
    accessibilityLevel: 'WCAG2AA',
    force: true,
    reportLevels: {
      notice: true,
      warning: true,
      error: true
    }
  }).on('error', function () {
    process.exit(1);
  });

  return gulp.src(['build/library/components/preview/*.html', '!build/library/components/preview/*--*.html'])
    .pipe(a)
    .pipe(access.report({
      reportType: 'json'
    }))
    .pipe(rename({
      extname: '.json'
    }))
    .pipe(gulp.dest('wcag'));
}
