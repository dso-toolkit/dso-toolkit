const concurrently = require("concurrently");

concurrently(
  [
    {
      name: "stencil",
      command: "yarn workspace @dso-toolkit/core stencil build --watch --serve --no-open",
      prefixColor: "bgCyan",
    },
    {
      name: "fractal",
      command: "wait-on file:./packages/core/dist/dso-toolkit/dso-toolkit.esm.js && yarn workspace dso-toolkit start",
      prefixColor: "bgMagenta",
    },
  ],
  {
    killOthers: ["failure", "success"],
  }
);
