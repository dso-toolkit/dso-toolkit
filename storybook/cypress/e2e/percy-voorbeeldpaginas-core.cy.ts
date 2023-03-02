import voorbeeldpaginasCore from "../fixtures/percy-voorbeeldpaginas-core.json";

import { percyHeaderFix } from "../support/percy-header-fix";

describe("Percy", () => {
  if (!Cypress.env("PERCY")) {
    it("should not take screenshots", () => {
      cy.wrap(true).should("eq", true);
    });

    return;
  }

  it("take screenshot of all in /cypress/fixtures/percy-voorbeeldpaginas-core.json", () => {
    for (const id of voorbeeldpaginasCore) {
      cy.visit(`http://localhost:45000/iframe.html?id=${id}`);

      percyHeaderFix();

      cy.percySnapshot(id);
    }
  });
});
