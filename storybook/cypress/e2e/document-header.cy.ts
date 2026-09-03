describe("Document Header", () => {
  beforeEach(() => {
    cy.viewport(1280, 600);
  });

  const stickyStories = ["sticky", "sticky-besluitversie", "sticky-ontwerp"];
  const stories = ["default", "default-besluitversie", "default-ontwerp", ...stickyStories];

  for (const story of stories) {
    it(`should be accessible (${story})`, () => {
      cy.visit(`http://localhost:45000/iframe.html?id=html-css-document-header--${story}`);
      cy.injectAxe();
      cy.dsoCheckA11y(".dso-document-header");
    });

    it(`matches imageSnapshot (${story})`, () => {
      cy.visit(`http://localhost:45000/iframe.html?id=html-css-document-header--${story}`);
      cy.get(".dso-document-header").compareSnapshot(`${Cypress.currentTest.titlePath.join(" -- ")}`);
    });
  }

  describe("Below 850px", () => {
    beforeEach(() => {
      cy.viewport(849, 600);
    });

    for (const story of stickyStories) {
      it(`matches imageSnapshot (${story})`, () => {
        cy.visit(`http://localhost:45000/iframe.html?id=html-css-document-header--${story}`);
        cy.get(".dso-document-header").compareSnapshot(`${Cypress.currentTest.titlePath.join(" -- ")}`);
      });
    }
  });
});
