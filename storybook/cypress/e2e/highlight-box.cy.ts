describe("Highlight Box", () => {
  const stories = [
    "default",
    "green",
    "grey-with-border",
    "white-with-dropshadow",
    "with-banner-image",
    "with-border",
    "with-icon",
    "yellow",
  ];

  for (const story of stories) {
    it(`should be accessible (${story})`, () => {
      cy.visit(`http://localhost:45000/iframe.html?id=core-highlight-box--${story}`);
      cy.injectAxe();
      cy.dsoCheckA11y("dso-highlight-box.hydrated");
    });

    it(`matches imageSnapshot (${story})`, () => {
      cy.visit(`http://localhost:45000/iframe.html?id=core-highlight-box--${story}`);
      cy.get("dso-highlight-box.hydrated").matchImageSnapshot(`${Cypress.currentTest.title} - ${story}`);
    });
  }
});
