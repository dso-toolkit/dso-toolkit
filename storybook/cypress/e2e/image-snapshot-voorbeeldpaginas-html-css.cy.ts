import voorbeeldpaginas from "../fixtures/image-snapshot-voorbeeldpaginas.json";

import { imageSnapshotHeaderFix } from "../support/image-snapshot-header-fix";

describe("Voorbeeldpagina's (HTML/CSS)", () => {
  it("take screenshot of all in /cypress/fixtures/image-snapshot-voorbeeldpaginas.json (HTML/CSS)", () => {
    for (const id of voorbeeldpaginas) {
      cy.visit(`http://localhost:45000/iframe.html?id=${id}&args=preferredImplementation:html-css`);

      imageSnapshotHeaderFix();

      cy.matchImageSnapshot(`${id} (HTML CSS)`);
    }
  });
});
