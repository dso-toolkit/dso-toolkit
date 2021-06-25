const concurrently = require('concurrently');

concurrently(
  [
    {
      name: 'microbundle',
      command: 'yarn bin_rimraf dist && yarn bin_microbundle watch',
      prefixColor: 'bgYellow'
    }
  ],
  {
    killOthers: ['failure', 'success']
  }
);
