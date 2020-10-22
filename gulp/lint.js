/* eslint-env node */

const gulp = require('gulp');

const gulpIf = require('gulp-if');
const isCi = require('./functions/is-ci');

module.exports = {
  lintStyles,
  lintWatcher
};

function lintStyles() {
  return gulp.src('src/styles/**/*.s[ac]ss');
}

function lintWatcher(logger) {
  gulp.watch('src/**/*.s[ac]ss').on('all', function (event, path, stats) {
    return lintStyles();
  });
}
