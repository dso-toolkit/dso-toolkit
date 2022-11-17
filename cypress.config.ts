import { defineConfig } from "cypress";
import { readdirSync } from "fs";

export default defineConfig({
  video: false,
  e2e: {
    excludeSpecPattern: !process.env.PERCY_TOKEN ? ["**/percy.cy.ts"] : undefined,
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, _config) {
      on("task", {
        getAllComponentsWithSpecs() {
          const specs = readdirSync("cypress/e2e")
            .map((f) => f.substring(0, f.indexOf(".cy.ts")))
            .filter((f) => f !== "percy");

          return specs;
        },
      });
    },
  },
});
