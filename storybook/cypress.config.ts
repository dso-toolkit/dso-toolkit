import { defineConfig } from "cypress";
import { addMatchImageSnapshotPlugin } from "@simonsmith/cypress-image-snapshot/plugin";

export default defineConfig({
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
      });
    },
  },
});
