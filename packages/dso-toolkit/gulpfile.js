/* eslint-env node */

const gulp = require('gulp');
const log = require('fancy-log');

const { build, buildTheme, buildThemeWatcher, cleanBuild, buildToolkit, createDomReference, buildWatcher } = require('./gulp/build');
const { testDom } = require('./gulp/test');
const { copyLibs } = require('./gulp/copy-libs');

gulp.task('clean', cleanBuild);
gulp.task('default', gulp.series(cleanBuild, buildToolkit({ dev: true }), buildTheme, fractalDev, watch));

gulp.task('build', build);
gulp.task('build:theme', buildTheme);
gulp.task('test', gulp.series(testDom));
gulp.task('test:dom', testDom);
gulp.task('reference:dom', createDomReference);

gulp.task('copy-libs', copyLibs);

function watch() {
  const changeLogger = (type, event, path) => log(`${event} detected: ${path}. Recompiling ${type}`);

  buildThemeWatcher(changeLogger);
  buildWatcher({ dev: true })(changeLogger);
}

function fractalDev() {
  const fractal = require('./fractal.js');

  const server = fractal.web.server({
    sync: true
  });
  server.on('error', err => log.error(err.message));

  return server.start().then(() => {
    log(`Fractal server is now running at ${server.url}`);
  });
}
