const concurrently = require('concurrently');

concurrently(
  [
    {
      name: 'stencil',
      command: 'yarn workspace @dso-toolkit/core stencil build --watch --serve --no-open',
      prefixColor: 'bgWhite'
    },
    {
      name: 'storybook',
      command: 'wait-on file:./packages/core/dist/dso-toolkit/dso-toolkit.esm.js && yarn workspace @dso-toolkit/core bin:start-storybook --static-dir ./dist --port 56106',
      prefixColor: 'bgMagenta'
    },
    {
      name: 'leaflet',
      command: 'wait-on file:./packages/core/dist/dso-toolkit/dso-toolkit.esm.js && yarn workspace @dso-toolkit/leaflet-plugins start',
      prefixColor: 'green'
    }
  ],
  {
    killOthers: ['failure', 'success']
  }
);
