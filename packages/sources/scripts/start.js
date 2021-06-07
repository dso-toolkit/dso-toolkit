const concurrently = require('concurrently');

concurrently(
  [
    {
      name: 'microbundle',
      command: 'yarn bin:rimraf dist && yarn bin:microbundle watch',
      prefixColor: 'bgYellow'
    }
  ],
  {
    killOthers: ['failure', 'success']
  }
);
