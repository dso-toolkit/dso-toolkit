/* eslint-env node */

const gulp = require('gulp');
const util = require('gulp-util');

const fractal = require('./fractal.js');

const { lintStyles, lintScripts, lintWatcher } = require('./gulp/lint');
const { cleanBuild, buildToolkit, buildSite, createDomReference, buildWatcher } = require('./gulp/build');
const { testAccessibility, testDom } = require('./gulp/test');
const { postBuild } = require('./gulp/post-build');

const log = util.log;

gulp.task('clean', cleanBuild);
gulp.task('default', gulp.series(cleanBuild, buildToolkit({ dev: true }), fractalDev, watch));

gulp.task('lint', gulp.parallel(lintStyles, lintScripts));
gulp.task('build', gulp.series(cleanBuild, buildToolkit(), buildSite));
gulp.task('build:site', buildSite);
gulp.task('test', gulp.series(testDom, testAccessibility));
gulp.task('test:accessibility', testAccessibility);
gulp.task('test:dom', testDom);
gulp.task('post-build', gulp.series(postBuild));
gulp.task('reference:dom', createDomReference);

function watch() {
  const changeLogger = (type, event, path) => log(`${event} detected: ${path}. Recompiling ${type}`);

  lintWatcher(changeLogger);
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

