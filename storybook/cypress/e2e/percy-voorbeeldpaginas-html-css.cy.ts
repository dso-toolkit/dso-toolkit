import voorbeeldpaginas from "../fixtures/percy-voorbeeldpaginas.json";

import { percyHeaderFix } from "../support/percy-header-fix";

describe("Percy", () => {
  if (!Cypress.env("PERCY") || (true as boolean)) {
    it("should not take screenshots", () => {
      cy.wrap(true).should("eq", true);
    });

    return;
  }

  it("take screenshot of all in /cypress/fixtures/percy-voorbeeldpaginas.json (HTML/CSS)", () => {
    for (const id of voorbeeldpaginas) {
      cy.visit(`http://localhost:45000/iframe.html?id=${id}&args=preferredImplementation:html-css`);

      percyHeaderFix();

      // cy.percySnapshot(`${id} (HTML/CSS)`);
    }
  });
});
