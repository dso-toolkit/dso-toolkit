const concurrently = require('concurrently');
const argv = require('minimist')(process.argv.slice(2));

concurrently(
  [
    {
      name: 'stencil',
      command: `yarn bin_stencil build ${argv.prod ? '--prod' : '--dev'} --watch --serve --no-open`,
      prefixColor: 'bgCyan'
    },
    {
      name: 'storybook',
      command: 'wait-on file:./dist/dso-toolkit/dso-toolkit.esm.js && yarn bin_start-storybook --static-dir ./dist,../sources/storybook-assets --port 56106',
      prefixColor: 'bgMagenta'
    }
  ],
  {
    killOthers: ['failure', 'success']
  }
);
