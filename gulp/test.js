/* eslint-env node */

const gulp = require('gulp');
const util = require('gulp-util');

const access = require('gulp-accessibility');
const del = require('del');
const fs = require('fs');
const hiff = require('hiff');
const path = require('path');
const rename = require('gulp-rename');
const tap = require('gulp-tap');

const log = util.log;

module.exports = {
  testAccessibility: gulp.series(clean, testAccessibility),
  testDom
};

function clean() {
  return del('wcag');
}

function testAccessibility() {
  let a = access({
    accessibilityLevel: 'WCAG2AA',
    force: true,
    reportLevels: {
      notice: true,
      warning: true,
      error: true
    }
  }).on('error', function () {
    process.exit(1);
  });

  return gulp.src(['build/library/components/preview/*.html', '!build/library/components/preview/*--*.html'])
    .pipe(a)
    .pipe(access.report({
      reportType: 'json'
    }))
    .pipe(rename({
      extname: '.json'
    }))
    .pipe(gulp.dest('wcag'));
}

function testDom(cb) {
  let changeCount = 0;

  return gulp.series(testAgainstReference, propegateResult)(cb);

  function testAgainstReference() {
    return gulp.src('build/library/components/render/*.html')
      .pipe(tap(function (file) {
        let filename = path.basename(file.path);
        let referenceHtml = null;

        try {
          referenceHtml = fs.readFileSync(`reference/render/${filename}`, { encoding: 'utf-8' });
        }
        catch (e) {
          noop(e);
        }

        if (referenceHtml) {
          var html = file.contents.toString();

          let result = hiff.compare(referenceHtml, html, { tagComparison: { name: 1, id: 1, attributes: 1, contents: 1 } });
          if (result.different) {
            result.changes.forEach(function (change) {
              log(`${change.message} in ${filename}`);

              changeCount++;
            });
          }
        }
      }));
  }

  function propegateResult(cb) {
    if (changeCount > 0) {
      cb();

      process.exit(1);
    }
    else {
      log('No DOM changes found');

      cb();
    }
  }
}

function noop() {
  return null;
}
