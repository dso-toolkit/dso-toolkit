const concurrently = require('concurrently');
const rimraf = require('rimraf');
const argv = require('minimist')(process.argv.slice(2));

rimraf.sync('packages/sources/dist');
rimraf.sync('packages/core/dist');
rimraf.sync('packages/core/loader');
rimraf.sync('packages/core/www');
rimraf.sync('packages/css/dist');
rimraf.sync('packages/react/src/components.ts');
rimraf.sync('packages/react/src/react-component-lib');
rimraf.sync('packages/react/dist');
rimraf.sync('packages/leaflet/dist');
rimraf.sync('packages/react-leaflet/dist');

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

const watchCss = {
  command: 'yarn workspace @dso-toolkit/css watch',
  name: 'css'
};

const startReact = {
  command: 'wait-on file:./packages/core/dist/dso-toolkit/dso-toolkit.esm.js && yarn workspace @dso-toolkit/react start',
  name: 'react'
};

const startLeaflet = {
  command: 'wait-on file:./packages/core/dist/dso-toolkit/dso-toolkit.esm.js && yarn workspace @dso-toolkit/leaflet start',
  name: 'leaflet',
  prefixColor: 'green'
};

const buildLeaflet = {
  command: 'wait-on file:./packages/core/dist/dso-toolkit/dso-toolkit.esm.js && yarn workspace @dso-toolkit/leaflet build',
  name: 'leaflet',
  prefixColor: 'green'
};

const startReactLeaflet = {
  command: 'wait-on file:./packages/leaflet/dist/leaflet.js && yarn workspace @dso-toolkit/react-leaflet start',
  name: 'leaflet',
  prefixColor: 'green'
};

switch(argv.mode) {
  case 'core':
    concurrently(
      [
        watchCss,
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
  case 'leaflet':
    concurrently(
      [
        startSources,
        watchCss,
        startCoreProd,
        startLeaflet
      ]
    );

    break;
  case 'react-leaflet':
    concurrently(
      [
        startSources,
        watchCss,
        startCoreProd,
        buildLeaflet,
        startReactLeaflet
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
        watchCss,
        startSources,
        startCoreWatcher,
        startReact
      ]
    );

    break;
  default:
    throw new Error('Invalid or no --mode');
}
