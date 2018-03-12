/* eslint-env node */

const gulp = require('gulp');
const util = require('gulp-util');
const inlineSvg = require('gulp-inline-svg');

const fractal = require('./fractal.js');
const slug = require('slug');

const { lintStyles, lintWatcher } = require('./gulp/lint');
const { build, cleanBuild, buildToolkit, createDomReference, buildWatcher } = require('./gulp/build');
const { testAccessibility, testDom } = require('./gulp/test');
const { postBuild } = require('./gulp/post-build');

const log = util.log;

slug.defaults.mode ='rfc3986';
slug.defaults.modes['rfc3986'] = {
    replacement: '-',      // replace spaces with replacement
    symbols: true,         // replace unicode symbols or not
    remove: null,          // (optional) regex to remove characters
    lower: true,           // result in lower case
    charmap: slug.charmap, // replace special characters
    multicharmap: slug.multicharmap // replace multi-characters
};
slug.defaults.modes['pretty'] = {
    replacement: '-',
    symbols: true,
    remove: /[.]/g,
    lower: false,
    charmap: slug.charmap,
    multicharmap: slug.multicharmap
};

gulp.task('clean', cleanBuild);
gulp.task('default', gulp.series(cleanBuild, buildToolkit({ dev: true }), fractalDev, watch));

gulp.task('lint', lintStyles);
gulp.task('build', build);
gulp.task('test', gulp.series(testDom, testAccessibility));
gulp.task('test:accessibility', testAccessibility);
gulp.task('test:dom', testDom);
gulp.task('post-build', gulp.series(postBuild));
gulp.task('reference:dom', createDomReference);

gulp.task('inline-svg', function() {
  return gulp.src('assets/icons/**/*.svg')
    .pipe(inlineSvg({
      filename: 'dso-icons.scss',
      template: 'assets/icons/template.mustache',
      context: {
        prefix: 'dso-icon'
      },
      interceptor: function (svgData, file) {
        return Object.assign(svgData, { variableName: slug(file.relative.replace(/['\\'_]/g, '-').replace('.svg', '')) });
      }
    }))
    .pipe(gulp.dest('src/styles/icons'));
});

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
