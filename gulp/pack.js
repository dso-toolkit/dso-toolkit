/* eslint-env node */

const gulp = require('gulp');

const del = require('del');

module.exports = {
  pack: gulp.series(clean, gulp.parallel(packPublicModule, packPrivateModule)),
  packPublicModule,
  packPrivateModule
};

function clean() {
  return del('dist');
}

function packPublicModule() {
  return gulp
    .src('build/toolkit')
    .pipe(gulp.dest('dist/dso-toolkit'));
}

function packPrivateModule() {
  return gulp
    .src('build/toolkit')
    .pipe(gulp.dest('dist/@infoprojects-nl/dso-toolkit'));
}
