/* eslint-env node */

const gulp = require('gulp');
const util = require('gulp-util');

const del = require('del');
const fractal = require('../fractal.js');
const fse = require('fs-extra');
const path = require('path');
const pretty = require('pretty');
const sass = require('gulp-sass');
const tap = require('gulp-tap');
const trim = require('gulp-trim');
const svgmin = require('gulp-svgmin');
const svgstore = require('gulp-svgstore');
const prettyData = require('gulp-pretty-data');
const cheerio = require('gulp-cheerio');
const rename = require('gulp-rename');

const log = util.log;

module.exports = {
  cleanBuild,
  createSvgSpritesheet,
  buildToolkit: options => gulp.series(buildStylesWrapper(options), createSvgSpritesheet, copyAssets),
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

    gulp.watch('src/icons/*.svg').on('all', function (event, path, stats) {
      logger('icons', event, path);

      return createSvgSpritesheet();
    });
  };
}

function createSvgSpritesheet() {
  return gulp
    .src('src/icons/*.svg')
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(cheerio({
      run: function ($) {
        const grid = 32;
        const symbols = $('symbol');

        symbols.each(function (index, element) {
          const symbol = $(element);
          const id = symbol.attr('id');

          symbol
            .before(`<!-- START: ${id} -->`)
            .after(`<!-- END: ${id} -->`);

          const view = $('<view>')
            .attr('id', `img-${id}`)
            .attr('viewBox', [index * grid, 0, grid, grid].join(' '));

          symbol.before(view);

          const use = $('<use>')
            .attr('href', `#${id}`);

          const g = $('<g>')
            .attr('transform', `translate(${index * grid})`)
            .append(use);

          symbol.before(g);
        });

        $(':root').attr('viewBox', [symbols.length * grid / 2 - grid / 2, 0, symbols.length * grid, grid].join(' '))
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(prettyData({
      type: 'prettify',
      extensions: {
        'svg': 'xml'
      }
    }))
    .pipe(rename('dso-icons.svg'))
    .pipe(gulp.dest('build/toolkit'));
}
