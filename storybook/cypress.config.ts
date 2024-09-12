import { defineConfig } from "cypress";
import { addMatchImageSnapshotPlugin } from "@simonsmith/cypress-image-snapshot/plugin";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, _config) {
      addMatchImageSnapshotPlugin(on);
      on("task", {
        log(message) {
          console.error(message);

          return null;
        },
      });
      on("task", {
        table(message) {
          console.error(message);

          return null;
        },
      });
    },
  },
});
