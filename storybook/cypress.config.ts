import { defineConfig } from "cypress";

export default defineConfig({
  video: false,
  e2e: {
    excludeSpecPattern: !process.env.PERCY_TOKEN ? ["**/percy.cy.ts"] : undefined,

    setupNodeEvents(_on, _config) {
      // This method is needed for Cypress /Th
    },
  },
});
