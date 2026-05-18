describe("Card Container", () => {
  beforeEach(() => {
    cy.viewport(1280, 600);
  });

  const stories = ["card-grid", "card-list"];

  for (const story of stories) {
    it(`should be accessible (${story})`, () => {
      cy.visit(`http://localhost:45000/iframe.html?id=core-card-container--${story}`);
      cy.injectAxe();
      cy.dsoCheckA11y("dso-card-container.hydrated");
    });

    it(`matches imageSnapshot (${story})`, () => {
      cy.visit(`http://localhost:45000/iframe.html?id=core-card-container--${story}`);
      cy.get("dso-card-container.hydrated").matchImageSnapshot(`${Cypress.currentTest.title} - ${story}`);
    });
  }
});
