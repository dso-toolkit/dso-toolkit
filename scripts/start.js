const concurrently = require('concurrently');
const rimraf = require('rimraf');
const argv = require('minimist')(process.argv.slice(2));

rimraf.sync('packages/sources/dist');

const startSources = {
  command: 'yarn workspace @dso-toolkit/sources start',
  name: 'sources'
};

const startCore = {
  command: 'wait-on file:./packages/sources/dist/sources.js && yarn workspace @dso-toolkit/core start',
  name: 'core'
};

const startCss = {
  command: 'wait-on file:./packages/sources/dist/sources.js && yarn workspace @dso-toolkit/css start',
  name: 'css'
};

switch(argv.mode) {
  case 'core':
    concurrently(
      [
        startSources,
        startCore
      ]
    );

    break;
  case 'css':
    concurrently(
      [
        startSources,
        startCss
      ]
    );

    break;
  case 'all':
    concurrently(
      [
        startSources,
        startCore,
        startCss
      ]
    );

    break;
  default:
    throw new Error('Invalid or no --mode');
}
