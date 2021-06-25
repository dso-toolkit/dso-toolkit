const concurrently = require('concurrently');
const { resolve } = require('path');

const coreDist = resolve(__dirname, '../../core/dist');

concurrently(
  [
    {
      name: 'storybook',
      command: `wait-on file:./src/components.ts && yarn bin_start-storybook --static-dir ${coreDist} --port 56406`,
      prefixColor: 'bgMagenta'
    }
  ],
  {
    killOthers: ['failure', 'success']
  }
);
