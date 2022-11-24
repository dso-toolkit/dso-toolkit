/* eslint-env node */

const gulp = require('gulp');

const { build } = require('./gulp/build');
const { copyLibs } = require('./gulp/copy-libs');

gulp.task('build', build);

gulp.task('copy-libs', copyLibs);
