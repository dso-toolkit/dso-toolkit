/* eslint-env node */

const gulp = require('gulp');

const eslint = require('gulp-eslint');
const gulpIf = require('gulp-if');
const sassLint = require('gulp-sass-lint');
const isCi = require('./functions/is-ci');

module.exports = {
  lintStyles,
  lintScripts,
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

function lintScripts() {
  return gulp.src(['**/*.js', '!node_modules/**', '!build/**'])
    .pipe(eslint({
      verbose: true
    }))
    .pipe(eslint.format())
    .pipe(gulpIf(isCi, eslint.failOnError()));
}

function lintWatcher(logger) {
  gulp.watch('components/**/*.js').on('all', function (event, path, stats) {
    logger('scripts', event, path);

    return lintScripts();
  });

  gulp.watch('src/**/*.s[ac]ss').on('all', function (event, path, stats) {
    return lintStyles();
  });
}
