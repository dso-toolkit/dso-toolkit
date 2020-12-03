/* eslint-env node */

const gulp = require('gulp');
const del = require('del');
const fractal = require('../fractal.js');
const fse = require('fs-extra');
const path = require('path');
const pretty = require('pretty');
const sass = require('gulp-sass');
const tap = require('gulp-tap');
const trim = require('gulp-trim');
const svgmin = require('gulp-svgmin');
const filter = require('gulp-filter');
const log = require('fancy-log');

const { buildTheme, buildThemeWatcher } = require('./theme');

module.exports = {
  cleanBuild,
  buildTheme,
  buildThemeWatcher,
  buildToolkit: options => gulp.series(buildStylesWrapper(options), copyAssets),
  createDomReference: gulp.series(buildSite, createDomReference),
  buildWatcher: options => buildWatcher(options)
};

module.exports.build = gulp.series(
  () => Promise.resolve(process.env.DSO_RENDER_MODE = 'static'),
  cleanBuild,
  module.exports.buildToolkit({ library: true }),
  buildTheme,
  buildSite,
  trimReports,
  cleanUpBuild,
  module.exports.buildToolkit()
);

function cleanBuild() {
  return del('build');
}

function buildSite() {
  const logTruncater = 25;
  const builder = fractal.web.builder();

  builder.on('error', err => log.error(err.message));
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

function buildStylesWrapper(options) {
  options = options || {};

  return function buildStyles() {
    const sassCompiler = sass({
      includePaths: [
        path.join(process.cwd(), '../../node_modules'),
        path.join(process.cwd(), 'libs')
      ]
    }).on('error', sass.logError);

    return gulp.src(`${options.library || options.dev ? 'components' : 'src'}/*.s[ac]ss`)
      .pipe(sassCompiler)
      .pipe(gulp.dest('build/toolkit/styles'));
  };
}

function copyAssets() {
  const f = filter('**/*.svg', { restore: true });

  return gulp
    .src([
      'assets/**'
    ])
    .pipe(f)
    .pipe(svgmin())
    .pipe(f.restore)
    .pipe(gulp.src(path.resolve(path.dirname(require.resolve('@dso-toolkit/styling')), 'dist', 'dso-icons.svg')))
    .pipe(gulp.dest('build/toolkit'));
}

function createDomReference() {
  log('Cleaning component reference files');

  return fse.remove('reference/render')
    .then(function () {
      log('Copied reference component files');

      const files = fse.readdirSync('build/library/components/render');
      const f = filter(({ basename, extname }) => {
        const handle = path.basename(basename, extname);

        if (handle === 'preview') {
          return false;
        }

        if (handle.includes('--')) {
          return true;
        }

        if (files.some(file => file.includes(`${handle}--`))) {
          return false;
        }

        return true;
      });

      return gulp.src('build/library/components/render/*.html')
        .pipe(f)
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
    gulp.watch([
      'components/**/*.scss',
      'src/dso.scss',
      'src/styles/**/*.scss',
      '../styling/**/*.scss' // :( using require.resolve() gives a path gulp doesn't work with
    ])
      .on('all', function (event, path, stats) {
        logger('styles', event, path);

        return buildStylesWrapper(options)();
      });

    gulp.watch('assets/**/*').on('all', function (event, path, stats) {
      logger('assets', event, path);

      return copyAssets();
    });
  };
}
