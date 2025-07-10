import { concurrently } from "concurrently";

concurrently(
  [
    {
      name: "stencil",
      command: "yarn stencil build --prod --watch --serve --no-open",
      prefixColor: "bgCyan",
    },
    {
      name: "stencil-readme",
      command: "yarn tsx scripts/readme.ts --watch",
      prefixColor: "bgBlue",
    },
  ],
  {
    killOthers: ["failure", "success"],
  },
);
