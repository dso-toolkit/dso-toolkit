const concurrently = require("concurrently");

concurrently(
  [
    {
      name: "stencil",
      command: "stencil build --prod --watch --serve --no-open",
      prefixColor: "bgCyan",
    },
  ],
  {
    killOthersOn: ["failure", "success"],
  },
);
