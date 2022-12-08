import components from "../fixtures/percy-components.json";

describe("Percy", () => {
  it("take screenshot of all in /cypress/fixtures/percy-components.json", () => {
    for (const id of components) {
      cy.visit(`http://localhost:45000/iframe.html?id=${id}`);

      cy.percySnapshot(id);
    }
  });
});
