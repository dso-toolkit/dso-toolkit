describe("Responsive element", () => {
  const responsiveElementSelector = "dso-responsive-element.hydrated";
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-responsive-element--responsive-element");
  });

  it("should be accessible - default", () => {
    cy.injectAxe();
    cy.dsoCheckA11y(responsiveElementSelector);
  });

  it("should have size (small, medium, large) attribute depending on the viewport", () => {
    cy.viewport(1312, 660);
    cy.get(responsiveElementSelector).first().should("have.attr", "large");
    cy.matchImageSnapshot(`${Cypress.currentTest.title}: 1312 - large`);

    cy.viewport(992, 660);
    cy.get(responsiveElementSelector).first().should("have.attr", "medium");
    cy.matchImageSnapshot(`${Cypress.currentTest.title}: 992 - medium`);

    cy.viewport(656, 660);
    cy.get(responsiveElementSelector).first().should("have.attr", "large");
    cy.matchImageSnapshot(`${Cypress.currentTest.title}: 656 - large`);

    cy.viewport(407, 660);
    cy.get(responsiveElementSelector).first().should("have.attr", "medium");
    cy.matchImageSnapshot(`${Cypress.currentTest.title}: 407 - medium`);

    cy.viewport(406, 660);
    cy.get(responsiveElementSelector).first().should("have.attr", "small");
    cy.matchImageSnapshot(`${Cypress.currentTest.title}: 406 - small`);
  });
});
