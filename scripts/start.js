const concurrently = require('concurrently');
const rimraf = require('rimraf');
const argv = require('minimist')(process.argv.slice(2));

rimraf.sync('packages/stories/dist');

const startStories = {
  command: 'yarn workspace @dso-toolkit/stories start',
  name: 'stories'
};

const startCore = {
  command: 'wait-on file:./packages/stories/dist/stories.js && yarn workspace @dso-toolkit/core start',
  name: 'core'
};

const startCss = {
  command: 'wait-on file:./packages/stories/dist/stories.js && yarn workspace @dso-toolkit/css start',
  name: 'css'
};

switch(argv.mode) {
  case 'core':
    concurrently(
      [
        startStories,
        startCore
      ]
    );

    break;
  case 'css':
    concurrently(
      [
        startStories,
        startCss
      ]
    );

    break;
  case 'all':
    concurrently(
      [
        startStories,
        startCore,
        startCss
      ]
    );

    break;
  default:
    throw new Error('Invalid or no --mode');
}
