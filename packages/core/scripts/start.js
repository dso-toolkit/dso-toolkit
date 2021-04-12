const concurrently = require('concurrently');

concurrently(
  [
    {
      name: 'stencil',
      command: 'yarn bin:stencil build --dev --watch --serve --no-open',
      prefixColor: 'bgWhite'
    },
    {
      name: 'storybook',
      command: 'wait-on file:./dist/dso-toolkit/dso-toolkit.esm.js && yarn bin:start-storybook --static-dir ./dist --port 56106',
      prefixColor: 'bgMagenta'
    }
  ],
  {
    killOthers: ['failure', 'success']
  }
);
