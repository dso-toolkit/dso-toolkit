import { configureVisualRegression } from "cypress-visual-regression";
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    expose: {
      visualRegressionType: "regression",
      visualRegressionBaseDirectory: "cypress/snapshot-baseline",
      visualRegressionDiffDirectory: "cypress/snapshot-diff",
    },
    setupNodeEvents(on, config) {
      configureVisualRegression(on);

      if (config.env.visualRegressionType) {
        config.expose.visualRegressionType = config.env.visualRegressionType;
      }

      if (config.env.visualRegressionUpdateSnapshots) {
        config.expose.visualRegressionUpdateSnapshots = config.env.visualRegressionUpdateSnapshots;
      }

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

      return config;
    },
  },
});
