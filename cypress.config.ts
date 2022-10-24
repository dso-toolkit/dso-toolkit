import { defineConfig } from "cypress";

export default defineConfig({
  video: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    // eslint-disable-next-line @typescript-eslint/no-empty-function -- The presence of this function marks the Cypress configuration
    setupNodeEvents(_on, _config) {},
  },
});
