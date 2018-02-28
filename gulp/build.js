/* eslint-env node */

const gulp = require('gulp');
const util = require('gulp-util');

const del = require('del');
const fractal = require('../fractal.js');
const fse = require('fs-extra');
const path = require('path');
const sass = require('gulp-sass');
const trim = require('gulp-trim');

const log = util.log;

module.exports = {
  cleanBuild,
  buildToolkit: options => gulp.series(buildStyles(options || {}), copyAssets, copyFontAwesomeFonts),
  buildSite: gulp.series(buildSite, trimReports, cleanUpBuild),
  createDomReference: gulp.series(buildSite, createDomReference),
  buildWatcher: options => buildWatcher(options || {})
};

function cleanBuild() {
  return del('build');
}

function buildSite() {
  const logTruncater = 25;
  const builder = fractal.web.builder();

  builder.on('error', err => log(err.message));
  builder.on('progress', (completed, total) => {
    if (completed === total) {
      log(`Exported ${completed} of ${total} items`);
    }
    else if (completed % logTruncater === 0) {
      log(`Exporting ${Math.floor(completed / total * 100)}%..`);
    }
  });

  return builder.build().then(() => {
    log('Fractal build completed!');
  });
}

function trimReports() {
  return gulp
    .src('build/library/components/preview/*.html')
    .pipe(trim())
    .pipe(gulp.dest('build/library/components/preview'));
}

function cleanUpBuild() {
  return del(['build/toolkit/dummy', 'build/toolkit/docs']);
}

function buildStyles(options) {
  return () => {
    const sassCompiler = sass({
      includePaths: [
        path.join(process.cwd(), 'node_modules')
      ]
    }).on('error', sass.logError);

    return gulp.src(`${options.dev ? 'components' : 'src'}/*.s[ac]ss`)
      .pipe(sassCompiler)
      .pipe(gulp.dest('build/toolkit/styles'));
  };
}

function copyAssets() {
  return gulp
    .src([
      'assets/**',
      'node_modules/bootstrap-sass/assets/fonts{,/**}'
    ])
    .pipe(gulp.dest('build/toolkit'));
}

function copyFontAwesomeFonts() {
  return gulp
    .src('node_modules/@fortawesome/fontawesome-free-webfonts/webfonts/**')
    .pipe(gulp.dest('build/toolkit/fonts/fontawesome'));
}

function createDomReference() {
  log('Cleaning component reference files');

  return fse.remove('reference/components')
    .then(function () {
      log('Copied reference component files');

      return fse.copy('build/library/components/render', 'reference/render');
    });
}

function buildWatcher(options) {
  return logger => {
    gulp.watch('(components|src)/**/*.scss').on('all', function (event, path, stats) {
      logger('styles', event, path);

      return buildStyles(options)();
    });

    gulp.watch('assets/**/*').on('all', function (event, path, stats) {
      logger('assets', event, path);

      return copyAssets();
    });
  };
}
