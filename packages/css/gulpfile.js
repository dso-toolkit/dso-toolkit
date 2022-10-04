const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const path = require('path');
const svgstore = require('gulp-svgstore');
const prettyData = require('gulp-pretty-data');
const cheerio = require('gulp-cheerio');
const rename = require('gulp-rename');
const ListStream = require('list-stream');
const css = require('css');
const svgmin = require('gulp-svgmin');
const log = require('fancy-log');

const distPath = 'dist';
const dsoToolkitSourcesPath = path.resolve(__dirname, '../sources');
const iconsPath = path.resolve(dsoToolkitSourcesPath, 'src/icons');

gulp.task('build', gulp.parallel(createSvgSpritesheet, copyAssets, compileScss));

gulp.task('default', gulp.series(gulp.parallel(createSvgSpritesheet, copyAssets, compileScss), watcher));

function watcher() {
  gulp.watch(['src/**/*.scss', '../sources/src/**/*.scss']).on('change', event => {
    log('scss', event);

    return compileScss();
  });

  gulp.watch(`*.(svg|scss)`, { cwd: iconsPath }).on('all', function (event, path, stats) {
    log('icons', event);

    return createSvgSpritesheet();
  });
}

function compileScss() {
  return gulp.src('src/dso.scss')
    .pipe(sass({
      includePaths: ['../../node_modules']
    }))
    .pipe(gulp.dest('dist'));
}

function copyAssets() {
  const assetsPath = path.resolve(dsoToolkitSourcesPath, 'assets');
  const assetsDistPath = path.resolve(distPath, 'assets');

  return gulp
    .src('**', { cwd: assetsPath })
    .pipe(gulp.dest(assetsDistPath));
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
            .reduce((v, rule) => {
              const variantColors = rule.selectors.reduce((current, s) => {
                const color = rule.declarations.find(d => d.property === 'color')?.value;

                if (s === id && !v.some(variantColor => variantColor.selector === s)) {
                  return current.concat({
                    color,
                    selector: 'default'
                  });
                }

                if (s.startsWith(`${id}:`) && !v.some(variantColor => variantColor.selector === s.substr(`${id}:`.length))) {
                  return current.concat({
                    color,
                    selector: s.substr(`${id}:`.length)
                  });
                }

                return current;
              }, []);

              v.push(...variantColors);

              return v;
            }, [])

          return { id, variants };
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

            const variants = [
              { selector: id, color: stylesheet?.variants.find(v => v.selector === 'default')?.color },
              ...(stylesheet?.variants.filter(v => v.selector !== 'default').map(v => ({ selector: `${id}-${v.selector}`, color: v.color })) ?? [])
            ];

            const iconIds = variants.map(v => v.selector);

            symbol
              .before(`<!-- START: ${iconIds.join(', ')} -->`)
              .after(`<!-- END: ${iconIds.join(', ')} -->`);

            variants.forEach((variant, index) => {
              const x = (position + index) * (canvas + gutter) + gutter / 2;
              const svg = symbol.clone().removeAttr('id');
              $(svg).each((_index, element) => element.tagName = 'svg');

              if (variant.color) {
                svg.find('[fill="currentColor"]').attr('fill', variant.color);
              }

              const view = $('<view>')
                .attr('id', `img-${variant.selector}`)
                .attr('viewBox', [x, 0, canvas, canvas].join(' '));

              symbol.before(view);

              const g = $('<g>')
                .attr('transform', `translate(${x})`)
                .append(svg);

              symbol.before(g);
            });

            return position + variants.length;
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
