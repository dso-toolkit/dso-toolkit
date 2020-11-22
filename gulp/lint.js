/* eslint-env node */

const gulp = require('gulp');
const stylelint = require('gulp-stylelint');
const isCi = require('./functions/is-ci');

module.exports = {
  lintStyles,
  lintWatcher
};

function lintStyles() {
  return gulp.src('src/styles/**/*.s[ac]ss')
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
