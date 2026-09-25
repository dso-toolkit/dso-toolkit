import { addMatchImageSnapshotPlugin } from "@simonsmith/cypress-image-snapshot/plugin";
import { defineConfig } from "cypress";

export default defineConfig({
  expose: {
    requireSnapshots: process.env.CYPRESS_requireSnapshots === "true",
  },
  e2e: {
    setupNodeEvents(on, _config) {
      addMatchImageSnapshotPlugin(on);
      on("task", {
        error(message) {
          console.error(message);

          return null;
        },
        table(message) {
          console.table(message);

          return null;
        },
        info(message) {
          console.info(message);

          return null;
        },
      });
    },
  },
});
