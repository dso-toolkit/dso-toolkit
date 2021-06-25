const argv = require('minimist')(process.argv.slice(2));
const concurrently = require('concurrently');
const rimraf = require('rimraf');

rimraf.sync('dist');

const sassWatch = {
  name: 'sass',
  command: 'yarn bin_sass --watch src/dso.scss dist/dso.css',
  prefixColor: 'bgBlue'
};

const gulp = {
  name: 'gulp',
  command: 'yarn bin_gulp',
  prefixColor: 'bgRed'
};

const storybook = {
  name: 'storybook',
  command: 'wait-on file:./dist/dso.css && yarn bin_start-storybook --static-dir ./dist --port 56206',
  prefixColor: 'bgMagenta'
};

if (argv.start) {
  concurrently(
    [
      sassWatch,
      gulp,
      storybook
    ],
    {
      killOthers: ['failure', 'success']
    }
  );
}
else if (argv.watch) {
  concurrently(
    [
      sassWatch,
      gulp
    ],
    {
      killOthers: ['failure']
    }
  );
}
else {
  throw new Error('Needs --start or --watch');
}
