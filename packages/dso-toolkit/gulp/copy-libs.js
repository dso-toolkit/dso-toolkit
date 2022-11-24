const gulp = require('gulp');
const { resolve } = require('path');

module.exports = {
  copyLibs: gulp.parallel(copyGraphics, copyFavicon, copySources, copyCss)
};

function copyGraphics() {
  return gulp
    .src('assets/graphics/**', {
      cwd: resolve(__dirname, '../../sources')
    })
    .pipe(gulp.dest('assets/graphics'));
}

function copyFavicon() {
  return gulp
    .src('assets/favicon.ico', {
      cwd: resolve(__dirname, '../../sources')
    })
    .pipe(gulp.dest('assets'));
}

function copySources() {
  const stylingGlobs = [
    '**/*',
    '!./node_modules/**',
    '!./dist/**'
  ];

  return gulp
    .src(stylingGlobs, {
      cwd: resolve(__dirname, '../../sources')
    })
    .pipe(gulp.dest('libs/@dso-toolkit/sources'));
}

function copyCss() {
  const stylingDir = resolve(__dirname, '../../css', '**/*.{scss,svg}');

  return gulp
    .src(stylingDir)
    .pipe(gulp.dest('libs/@dso-toolkit/css'));
}
