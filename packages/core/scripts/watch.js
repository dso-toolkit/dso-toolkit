import { default as concurrently } from "concurrently";

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
