const concurrently = require('concurrently');
const rimraf = require('rimraf');
const argv = require('minimist')(process.argv.slice(2));

rimraf.sync('packages/sources/dist');
rimraf.sync('packages/react/src/components.ts');
rimraf.sync('packages/react/src/react-component-lib');
rimraf.sync('packages/react/dist');

const startSources = {
  command: 'yarn workspace @dso-toolkit/sources start',
  name: 'sources'
};

const startCore = {
  command: 'wait-on file:./packages/sources/dist/sources.js && yarn workspace @dso-toolkit/core start',
  name: 'core'
};

const startCoreProd = {
  command: 'wait-on file:./packages/sources/dist/sources.js && yarn workspace @dso-toolkit/core start --prod',
  name: 'core'
};

const startCoreWatcher = {
  command: 'wait-on file:./packages/sources/dist/sources.js && yarn workspace @dso-toolkit/core watch',
  name: 'core'
};

const startCss = {
  command: 'wait-on file:./packages/sources/dist/sources.js && yarn workspace @dso-toolkit/css start',
  name: 'css'
};

const startReact = {
  command: 'wait-on file:./packages/core/dist/dso-toolkit/dso-toolkit.esm.js && yarn workspace @dso-toolkit/react start',
  name: 'react'
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
        startCoreProd,
        startReact,
        startCss
      ]
    );

    break;
  case 'react':
    concurrently(
      [
        startSources,
        startCoreWatcher,
        startReact
      ]
    );

    break;
  default:
    throw new Error('Invalid or no --mode');
}
