/* eslint-env node */

const gulp = require('gulp');
const del = require('del');
const path = require('path');
const sass = require('gulp-sass')(require('sass'));
const svgmin = require('gulp-svgmin');
const filter = require('gulp-filter');

module.exports = {
  cleanBuild,
  buildToolkit: options => gulp.series(buildStylesWrapper(options), copyAssets),
};

module.exports.build = gulp.series(
  () => Promise.resolve(process.env.DSO_RENDER_MODE = 'static'),
  cleanBuild,
  module.exports.buildToolkit({ library: true }),
  module.exports.buildToolkit()
);

function cleanBuild() {
  return del('dist');
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
