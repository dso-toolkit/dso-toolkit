/* eslint-env node */

const gulp = require('gulp');
const util = require('gulp-util');

const del = require('del');
const fractal = require('../fractal.js');
const fse = require('fs-extra');
const inlineSvg = require('gulp-inline-svg');
const path = require('path');
const pretty = require('pretty');
const sass = require('gulp-sass');
const slug = require('slug');
const svgmin = require('gulp-svgmin');
const svgVariableName = require('./functions/svg-variable-name.js');
const tap = require('gulp-tap');
const trim = require('gulp-trim');

const log = util.log;

module.exports = {
  cleanBuild,
  buildToolkit: options => gulp.series(inlineSvgIcons, buildStylesWrapper(options), copyAssets, copyAsapFonts, copyBootstrapFonts, copyFontAwesomeFonts),
  createDomReference: gulp.series(buildSite, createDomReference),
  buildWatcher: options => buildWatcher(options)
};
module.exports.buildSite = gulp.series(module.exports.buildToolkit({ library: true }), buildSite, trimReports, cleanUpBuild);
module.exports.build = gulp.series(cleanBuild, module.exports.buildSite, module.exports.buildToolkit());

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

function inlineSvgIcons() {
  return gulp.src('assets/icons/**/*.svg')
    .pipe(svgmin())
    .pipe(inlineSvg({
      filename: 'dso-icons.scss',
      template: 'assets/icons/template.mustache',
      context: {
        prefix: 'dso-icon'
      },
      interceptor: function (svgData, file) {
        return Object.assign(svgData, { variableName: svgVariableName(file.relative) });
      }
    }))
    .pipe(gulp.dest('src/styles/icons'));
}

function buildStylesWrapper(options) {
  options = options || {};

  return function buildStyles() {
    const sassCompiler = sass({
      includePaths: [
        path.join(process.cwd(), 'node_modules')
      ]
    }).on('error', sass.logError);

    return gulp.src(`${options.library || options.dev ? 'components' : 'src'}/*.s[ac]ss`)
      .pipe(sassCompiler)
      .pipe(gulp.dest('build/toolkit/styles'));
  };
}

function copyAssets() {
  return gulp
    .src('assets/**')
    .pipe(gulp.dest('build/toolkit'));
}

function copyAsapFonts() {
  return gulp
    .src('node_modules/typeface-asap/files/**')
    .pipe(gulp.dest('build/toolkit/fonts/asap'));
}

function copyBootstrapFonts() {
  return gulp
    .src('node_modules/bootstrap-sass/assets/fonts/bootstrap/**')
    .pipe(gulp.dest('build/toolkit/fonts/bootstrap'));
}

function copyFontAwesomeFonts() {
  return gulp
    .src('node_modules/@fortawesome/fontawesome-free/webfonts/**')
    .pipe(gulp.dest('build/toolkit/fonts/fontawesome'));
}

function createDomReference() {
  log('Cleaning component reference files');

  return fse.remove('reference/render')
    .then(function () {
      log('Copied reference component files');

      return gulp.src('build/library/components/render/*.html')
        .pipe(tap(function (file) {
          let html = file.contents.toString();
          let prettied = pretty(html, { ocd: true, newlines: '\r\n', eol: '\r\n', end_with_newline: true });

          file.contents = Buffer.from(prettied);
        }))
        .pipe(gulp.dest('reference/render'));
    });
}

function buildWatcher(options) {
  options = options || {};

  return logger => {
    gulp.watch('(components|src)/**/*.scss').on('all', function (event, path, stats) {
      logger('styles', event, path);

      return buildStylesWrapper(options)();
    });

    gulp.watch('assets/**/*').on('all', function (event, path, stats) {
      logger('assets', event, path);

      return copyAssets();
    });
  };
}
