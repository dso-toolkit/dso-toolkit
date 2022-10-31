const concurrently = require("concurrently");

concurrently(
  [
    {
      name: "storybook",
      command: `wait-on file:./src/components.ts && yarn start-storybook --port 45600`,
      prefixColor: "bgMagenta",
    },
  ],
  {
    killOthers: ["failure", "success"],
  }
);
