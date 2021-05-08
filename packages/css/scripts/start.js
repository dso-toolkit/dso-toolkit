const concurrently = require('concurrently');
const rimraf = require('rimraf');

rimraf.sync('dist');

concurrently(
  [
    {
      name: 'sass',
      command: 'yarn bin:sass --watch src/dso.scss dist/dso.css',
      prefixColor: 'bgWhite'
    },
    {
      name: 'storybook',
      command: 'wait-on file:./dist/dso.css && yarn bin:start-storybook --static-dir ./dist --port 56206',
      prefixColor: 'bgMagenta'
    }
  ],
  {
    killOthers: ['failure', 'success']
  }
);
