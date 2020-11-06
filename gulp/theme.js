const del = require('del');
const gulp = require('gulp');
const rollup = require('rollup');
const commonjs = require('@rollup/plugin-commonjs');
const inject = require('@rollup/plugin-inject');
const nodeResolve = require('@rollup/plugin-node-resolve');

const { babel } = require('@rollup/plugin-babel');

module.exports = {
  buildTheme: gulp.series(themeClean, themePublic, themeCompileJS),
  buildThemeWatcher
};

function themeClean() {
  return del(['./theme/dist']);
}

function themePublic() {
  return gulp.src('./theme/public/**/*').pipe(gulp.dest('./theme/dist'));
}

function themeCompileJS() {
  return rollup.rollup({
    input: './theme/js/theme.js',
    plugins: [
      inject({
        jQuery: 'jquery'
      }),
      commonjs(),
      nodeResolve.nodeResolve(),
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled'
      })
    ]
  })
  .then(bundle => {
    return bundle.write({
      file: './theme/dist/theme.js',
      format: 'iife',
      sourcemap: true
    });
  });
}

function buildThemeWatcher(logger) {
  gulp.watch(['./theme/js/**/*']).on('all', function (event, path, stats) {
    logger('theme-js', event, path);

    return themeCompileJS();
  });
}

