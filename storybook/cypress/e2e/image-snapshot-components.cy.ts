import components from "../fixtures/image-snapshot-components.json";

import { imageSnapshotHeaderFix } from "../support/image-snapshot-header-fix";
import { imageSnapshotProgressIndicatorFix } from "../support/image-snapshot-progress-indicator-fix";

describe("Components without e2e tests", () => {
  it("take screenshot of all in /cypress/fixtures/image-snapshot-components.json", () => {
    for (const id of components) {
      cy.visit(`http://localhost:45000/iframe.html?id=${id}`);

      imageSnapshotHeaderFix();
      imageSnapshotProgressIndicatorFix();

      cy.matchImageSnapshot(id);
    }
  });
});
