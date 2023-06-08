import components from "../fixtures/percy-components.json";
import voorbeeldpaginasCore from "../fixtures/percy-voorbeeldpaginas-core.json";
import voorbeeldpaginasHtmlCss from "../fixtures/percy-voorbeeldpaginas-html-css.json";

describe("Percy", () => {
  if (!Cypress.env("PERCY")) {
    it("should not take screenshots", () => {
      cy.wrap(true).should("eq", true);
    });

    return;
  }

  it("take screenshot of all in /cypress/fixtures/percy-components.json", () => {
    for (const id of components) {
      cy.visit(`http://localhost:45000/iframe.html?id=${id}`);

      cy.percySnapshot(id);
    }
  });

  it("take screenshot of all in /cypress/fixtures/percy-voorbeeldpaginas-core.json", () => {
    for (const id of voorbeeldpaginasCore) {
      cy.visit(`http://localhost:45000/iframe.html?id=${id}`);

      cy.percySnapshot(id);
    }
  });

  it("take screenshot of all in /cypress/fixtures/percy-voorbeeldpaginas-html-css.json", () => {
    for (const id of voorbeeldpaginasHtmlCss) {
      cy.visit(`http://localhost:45000/iframe.html?id=${id}`);

      cy.percySnapshot(id);
    }
  });
});
