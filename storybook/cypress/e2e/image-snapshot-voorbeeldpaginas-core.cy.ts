import voorbeeldpaginas from "../fixtures/image-snapshot-voorbeeldpaginas.json";

import { imageSnapshotHeaderFix } from "../support/image-snapshot-header-fix";
import { imageSnapshotProgressIndicatorFix } from "../support/image-snapshot-progress-indicator-fix";

describe("Voorbeeldpagina's (Core)", () => {
  it("take screenshot of all in /cypress/fixtures/image-snapshot-voorbeeldpaginas.json (Core)", () => {
    for (const id of voorbeeldpaginas) {
      cy.visit(`http://localhost:45000/iframe.html?id=${id}`);

      imageSnapshotHeaderFix();
      imageSnapshotProgressIndicatorFix();

      cy.wait(1000).matchImageSnapshot(`${id} (Core)`);
    }
  });
});
