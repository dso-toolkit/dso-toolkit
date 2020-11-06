/* eslint-env node */

const gulp = require('gulp');
const tap = require('gulp-tap');

const stylelint = require('gulp-stylelint');
const isCi = require('./functions/is-ci');

module.exports = {
  lintStyles,
  lintWatcher
};

function lintStyles() {
  return gulp.src('src/**/*.s[ac]ss')
    .pipe(tap(f => console.log(f.path)))
    .pipe(stylelint({
      failAfterError: isCi,
      reporters: [{
        formatter: 'string',
        console: true
      }]
    }));
}

function lintWatcher(logger) {
  gulp.watch('src/**/*.s[ac]ss').on('all', function (event, path, stats) {
    return lintStyles();
  });
}
