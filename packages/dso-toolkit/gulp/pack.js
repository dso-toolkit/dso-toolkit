/* eslint-env node */

const gulp = require('gulp');
const util = require('gulp-util');

const file = require('gulp-file');
const gulpIf = require('gulp-if');
const packageJson = require('../package.json');
const path = require('path');
const rename = require('gulp-rename');

const log = util.log;

module.exports = {
  packDist
};

const branchMap = {
  dev: 'unstable',
  master: 'stable'
};

function packDist() {
  let channel = util.env.channel;
  const release = util.env.release;
  const branch = util.env.branch && util.env.branch.split('/').pop();
  const buildNumber = util.env.buildNumber || 65536;

  if (!channel) {
    channel = branchMap[branch];
  }

  if (!channel && !release) {
    log(`Invalid channel: "${channel}" and release: "${release}"`);
    log(`Branch ${branch}`);

    return null;
  }

  let version = release || `${packageJson.version}.${buildNumber}`;
  if (!release && channel !== 'latest') {
    version += `-${channel}`;
  }

  return gulp.src('build/**')
    .pipe(gulpIf(!!channel, rename(function (file) {
      if (file.dirname[0] === '.') {
        return;
      }

      const dir = file.dirname.split(path.sep);
      dir.splice(1, 0, 'www', channel);

      file.dirname = dir.filter(d => d).join(path.sep);
    })))
    .pipe(gulpIf(!!channel, gulp.dest('dist')))
    .pipe(gulpIf(channel === 'latest', rename(function (file) {
      if (file.dirname[0] === '.') {
        return;
      }

      const dir = file.dirname.split(path.sep);
      dir.splice(2, 1);

      file.dirname = dir.filter(d => d).join(path.sep);
    })))
    .pipe(gulpIf(channel === 'latest', gulp.dest('dist')))
    .pipe(gulpIf(!!release && (!channel || channel === 'latest'), rename(function (file) {
      if (file.dirname[0] === '.') {
        return;
      }

      const dirs = file.dirname.split(path.sep);
      const dir = [dirs.shift(), 'www', release];

      if (dirs[0] === 'www') {
        dirs.shift();
      }

      file.dirname = dir.concat(dirs).join(path.sep);
    })))
    .pipe(gulpIf(!!release && (!channel || channel === 'latest'), gulp.dest('dist')))
    .pipe(file('version', version))
    .pipe(gulp.dest('dist'));
}
