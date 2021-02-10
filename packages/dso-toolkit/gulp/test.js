/* eslint-env node */

const gulp = require('gulp');
const log = require('fancy-log');
const filter = require('gulp-filter');
const fs = require('fs');
const hiff = require('hiff');
const path = require('path');
const tap = require('gulp-tap');

module.exports = {
  testDom
};

function testDom(cb) {
  let changeCount = 0;

  return gulp.series(testAgainstReference, propegateResult)(cb);

  function testAgainstReference() {
    const files = fs.readdirSync('dist/library/components/render');
    const f = filter(({ basename, extname }) => {
      const handle = path.basename(basename, extname);

      if (handle === 'preview') {
        return false;
      }

      if (handle.includes('--')) {
        return true;
      }

      if (files.some(file => file.includes(`${handle}--`))) {
        return false;
      }

      return true;
    });

    return gulp.src('dist/library/components/render/*.html')
      .pipe(f)
      .pipe(tap(function (file) {
        let filename = path.basename(file.path);
        let referenceHtml = null;

        try {
          referenceHtml = fs.readFileSync(`reference/render/${filename}`, { encoding: 'utf-8' });
        }
        catch (e) {
          log.error(`reference/render/${filename} doesn't exist!`);

          changeCount++;
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
