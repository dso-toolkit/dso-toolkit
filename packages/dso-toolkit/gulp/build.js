/* eslint-env node */

const gulp = require('gulp');
const del = require('del');
const fse = require('fs-extra');
const path = require('path');
const prettier = require('prettier');
const sass = require('gulp-sass')(require('sass'));
const tap = require('gulp-tap');
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
  cleanUpBuild,
  module.exports.buildToolkit()
);

function cleanBuild() {
  return del('dist');
}

function buildSite() {
  const logTruncater = 25;

  const fractal = require('../fractal.js');
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

function cleanUpBuild() {
  return del(['dist/toolkit/dummy', 'dist/toolkit/docs']);
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
      .pipe(gulp.dest('dist/toolkit/styles'));
  };
}

function copyAssets() {
  const f = filter('**/*.svg', { restore: true });
  const cssDist = path.resolve(__dirname, '../../css/dist');

  return gulp
    .src([
      'assets/**'
    ])
    .pipe(f)
    .pipe(svgmin())
    .pipe(f.restore)
    .pipe(gulp.src(['assets/**', 'dso-icons.svg'].map(g => path.resolve(cssDist, g))))
    .pipe(gulp.dest('dist/toolkit'));
}

function createDomReference() {
  log('Cleaning component reference files');

  return fse.remove('reference/render')
    .then(function () {
      log('Copied reference component files');

      const files = fse.readdirSync('dist/library/components/render');
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

      return gulp.src('dist/library/components/render/*.html')
        .pipe(f)
        .pipe(tap(function (file) {
          let html = file.contents.toString();

          try {
            const prettied = prettier.format(html, {
              printWidth: 120,
              parser: 'html'
            });

            file.contents = Buffer.from(prettied);
          }
          catch (e) {
            console.error(file.path);

            throw e;
          }
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
      '../css/**/*.scss',
      '../sources/**/*.scss' // :( using require.resolve() gives a path gulp doesn't work with
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
