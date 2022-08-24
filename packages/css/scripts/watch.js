const concurrently = require('concurrently');
const rimraf = require('rimraf');

rimraf.sync('dist');

const sassWatch = {
  name: 'sass',
  command: 'yarn sass --watch src/dso.scss dist/dso.css',
  prefixColor: 'bgBlue'
};

const gulp = {
  name: 'gulp',
  command: 'yarn gulp',
  prefixColor: 'bgRed'
};

concurrently(
  [
    sassWatch,
    gulp
  ],
  {
    killOthers: ['failure']
  }
);
