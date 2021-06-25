const concurrently = require('concurrently');

concurrently(
  [
    {
      name: 'stencil',
      command: 'yarn bin_stencil build --watch',
      prefixColor: 'bgCyan'
    },
    {
      name: 'storybook',
      command: 'wait-on file:./dist/dso-toolkit/dso-toolkit.esm.js && yarn bin_start-storybook --static-dir ./dist --port 56106',
      prefixColor: 'bgMagenta'
    },
    {
      name: 'cypress',
      command: 'wait-on http://localhost:56106 && yarn bin_cypress open',
      prefixColor: 'bgGreen'
    }
  ],
  {
    killOthers: ['failure', 'success']
  }
);
