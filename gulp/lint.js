/* eslint-env node */

const gulp = require('gulp');

const gulpIf = require('gulp-if');
const sassLint = require('gulp-sass-lint');
const isCi = require('./functions/is-ci');

module.exports = {
  lintStyles,
  lintWatcher
};

function lintStyles() {
  return gulp.src('src/styles/**/*.s[ac]ss')
    .pipe(sassLint({
      options: {
        formatter: 'stylish',
        verbose: true
      },
      configFile: '.sass-lint.yml'
    }))
    .pipe(sassLint.format())
    .pipe(gulpIf(isCi, sassLint.failOnError()));
}

function lintWatcher(logger) {
  gulp.watch('src/**/*.s[ac]ss').on('all', function (event, path, stats) {
    return lintStyles();
  });
}
