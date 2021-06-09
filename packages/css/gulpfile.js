const gulp = require('gulp');
const sass = require('gulp-sass');
const path = require('path');
const svgstore = require('gulp-svgstore');
const prettyData = require('gulp-pretty-data');
const cheerio = require('gulp-cheerio');
const rename = require('gulp-rename');
const ListStream = require('list-stream');
const css = require('css');
const indent = require('indent');
const svgmin = require('gulp-svgmin');
const log = require('fancy-log');

const distPath = 'dist';
const dsoToolkitSourcesPath = path.dirname(require.resolve('@dso-toolkit/sources'));
const iconsPath = path.resolve(dsoToolkitSourcesPath, '../src', 'icons');

gulp.task('build', createSvgSpritesheet);

gulp.task('default', gulp.series(createSvgSpritesheet, watcher));

function watcher() {
  gulp.watch(`*.(svg|scss)`, { cwd: iconsPath }).on('all', function (event, path, stats) {
    log('icons', event, path);

    return createSvgSpritesheet();
  });
}

async function createSvgSpritesheet() {
  const sassCompiler = sass()
    .on('error', sass.logError);

  const stylesheets = await new Promise((resolve, reject) => {
    gulp.src(`${iconsPath}/*.scss`)
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
      .src(`${iconsPath}/*.svg`)
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
      .pipe(gulp.dest(distPath))
      .on('end', resolve)
      .on('error', reject);
    });
}

function transformSelector(selector) {
  const [primary, ...rest] = selector.split(' ');

  return `#img-${primary.replace(':', '-')} + g ${rest.join(' ')}`.trim();
}
