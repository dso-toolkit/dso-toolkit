// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

import "cypress-axe";
import "cypress-real-events";

import { addMatchImageSnapshotCommand } from "@simonsmith/cypress-image-snapshot/command";

addMatchImageSnapshotCommand({
  failureThreshold: 0.1,
  failureThresholdType: "percent",
  padding: 16, // units.$u2 for buiten-elementse functionele styling
  customDiffDir: "cypress/snapshot-diff",
  customSnapshotsDir: "cypress/snapshot-baseline",
});
