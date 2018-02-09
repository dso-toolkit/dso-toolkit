/* eslint-env node */

const gulp = require('gulp');
const util = require('gulp-util');

const fractal = require('./fractal.js');

const { lint, lintStyles, lintScripts } = require('./gulp/lint');
const { build, buildScripts, buildStyles, buildAssets, clean } = require('./gulp/build');
const { test } = require('./gulp/test');
const { postBuild } = require('./gulp/post-build');
const { pack } = require('./gulp/pack');

const log = util.log;

gulp.task('lint', lint);
gulp.task('build', build);
gulp.task('clean', clean);
gulp.task('test', test);
gulp.task('release', gulp.series(postBuild, pack));

gulp.task('default', gulp.series(clean, gulp.parallel(buildScripts, buildStyles, buildAssets), fractalDev, watch));

function watch() {
  const changeLogger = (type, event, path) => log(`${event} detected: ${path}. Recompiling ${type}`);

  gulp.watch('components/**/*.js').on('all', function (event, path, stats) {
    return lintScripts();
  });

  gulp.watch('src/**/*.js').on('all', function (event, path, stats) {
    changeLogger('scripts', event, path);

    return buildScripts();
  });

  gulp.watch('src/**/*.s[ac]ss').on('all', function (event, path, stats) {
    changeLogger('styles', event, path);

    return gulp.series(lintStyles, buildStyles)();
  });

  gulp.watch('assets/**/*').on('all', function (event, path, stats) {
    changeLogger('assets', event, path);

    return buildAssets();
  });
}

function fractalDev() {
  const server = fractal.web.server({
    sync: true
  });
  server.on('error', err => log(err.message));

  return server.start().then(() => {
    log(`Fractal server is now running at ${server.url}`);
  });
}

