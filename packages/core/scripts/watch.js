const concurrently = require("concurrently");

concurrently(
  [
    {
      name: "stencil",
      command: "yarn stencil build --prod --watch --serve --no-open",
      prefixColor: "bgCyan",
    },
  ],
  {
    killOthers: ["failure", "success"],
  }
);
