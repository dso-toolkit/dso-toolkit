/* eslint-env node */

const gulp = require('gulp');
const util = require('gulp-util');

const fractal = require('./fractal.js');

const { lintStyles, lintWatcher } = require('./gulp/lint');
const { build, buildTheme, buildThemeWatcher, cleanBuild, createSvgSpritesheet, buildToolkit, createDomReference, buildWatcher } = require('./gulp/build');
const { testDom } = require('./gulp/test');

const log = util.log;

gulp.task('clean', cleanBuild);
gulp.task('default', gulp.series(cleanBuild, buildToolkit({ dev: true }), buildTheme, fractalDev, watch));

gulp.task('lint', lintStyles);
gulp.task('build', build);
gulp.task('build:theme', buildTheme);
gulp.task('spritesheet', createSvgSpritesheet)
gulp.task('test', gulp.series(testDom));
gulp.task('test:dom', testDom);
gulp.task('reference:dom', createDomReference);

function watch() {
  const changeLogger = (type, event, path) => log(`${event} detected: ${path}. Recompiling ${type}`);

  lintWatcher(changeLogger);
  buildThemeWatcher(changeLogger);
  buildWatcher({ dev: true })(changeLogger);
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
