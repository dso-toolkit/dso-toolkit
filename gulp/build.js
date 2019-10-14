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
const ListStream = require('list-stream');
const css = require('css');
const indent = require('indent');

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
    .src(['assets/**','node_modules/svg4everybody/dist/svg4everybody.min.js'])
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
    gulp.watch(['components/**/*.scss', 'src/dso.scss', 'src/styles/**/*.scss']).on('all', function (event, path, stats) {
      logger('styles', event, path);

      return buildStylesWrapper(options)();
    });

    gulp.watch('assets/**/*').on('all', function (event, path, stats) {
      logger('assets', event, path);

      return copyAssets();
    });

    gulp.watch('src/icons/*.(svg|scss)').on('all', function (event, path, stats) {
      logger('icons', event, path);

      return createSvgSpritesheet();
    });
  };
}

function transformSelector(selector) {
  const [primary, ...rest] = selector.split(' ');

  return `#img-${primary.replace(':', '-')} + g ${rest.join(' ')}`.trim();
}

async function createSvgSpritesheet() {
  const sassCompiler = sass({
    includePaths: [
      path.join(process.cwd(), 'node_modules')
    ]
  }).on('error', sass.logError);

  const stylesheets = await new Promise((resolve, reject) => {
    gulp.src('src/icons/*.scss')
      .pipe(sassCompiler)
      .pipe(ListStream.obj((error, data) => {
        if (error) {
          reject(error);
        }

        resolve(data.map(({ relative, extname, contents }) => {
          const id = path.basename(relative, extname);
          const style = contents.toString();
          const ast = css.parse(style);
          const variants = ast.stylesheet.rules
            .filter(r => r.type === 'rule')
            .reduce((v, rule) =>
              v.concat(
                rule.selectors
                  .filter(s => s !== id && s.indexOf(`${id}:`) === 0)
                  .map(s => s.substr(id.length + 1))
                  .map(s => s.indexOf(' ') > -1 ? s.substr(0, s.indexOf(' ')) : s)
                  .filter(s => v.indexOf(s) === -1)
              ),
              []
            );

          ast.stylesheet.rules
            .filter(r => r.type === 'rule')
            .forEach(rule =>
                rule.selectors = rule.selectors.map(s => s.indexOf(id) === 0
                  ? transformSelector(s)
                  : s
                )
            );

          return { id, variants, style: css.stringify(ast) };
        }));
      }));
  });
  
  return new Promise((resolve, reject) => {
    gulp
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
          const canvas = 32;
          const gutter = 10;
          const symbols = $('symbol').toArray();

          const positions = symbols.reduce((position, element) => {
            const symbol = $(element);
            const id = symbol.attr('id');

            const stylesheet = stylesheets.find(s => s.id === id);
            const iconIds = [
              id,
              ...(stylesheet ? stylesheet.variants : []).map(v => `${id}-${v}`)
            ];

            symbol
              .before(`<!-- START: ${iconIds.join(', ')} -->`)
              .after(`<!-- END: ${iconIds.join(', ')} -->`);

            if (stylesheet) {
              const style = $('<style>')
              .attr('type', 'text/css')
              .html(`\n${indent(stylesheet.style, 4)}\n  `); // last two spaces are indent fix

              symbol.before(style);
            }

            iconIds.forEach((iconId, index) => {
              const x = (position + index) * (canvas + gutter) + gutter / 2;

              const view = $('<view>')
                .attr('id', `img-${iconId}`)
                .attr('viewBox', [x, 0, canvas, canvas].join(' '));

              symbol.before(view);

              const use = $('<use>')
                .attr('href', `#${id}`);

              const g = $('<g>')
                .attr('transform', `translate(${x})`)
                .append(use);

              symbol.before(g);
            });

            return position + iconIds.length;
          }, 0);

          $(':root').attr(
            'viewBox',
            [positions * (canvas + gutter) / 2 - (canvas + gutter) / 2 + gutter / 2, 0, positions * (canvas + gutter) + gutter, canvas].join(' ')
          );
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
      .pipe(gulp.dest('build/toolkit'))
      .pipe(tap(() => resolve()));
    });
}
