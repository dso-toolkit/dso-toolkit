describe("Info Button", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-info-button--with-toggletip");
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.dsoCheckA11y("dso-info-button.hydrated");
  });

  it(`should show the tooltip on hover`, () => {
    cy.get("dso-info-button.hydrated")
      .realHover()
      .shadow()
      .find("dso-icon-button")
      .shadow()
      .find(".dso-tooltip")
      .should("be.visible");
  });

  it("should show the toggletip on click", () => {
    cy.get("dso-info-button.hydrated").realClick().shadow().find("> .dso-tooltip").should("have.class", "visible");
    cy.get("dso-info-button.hydrated").realClick().shadow().find("> .dso-tooltip").should("not.have.class", "visible");
  });

  it("should show the toggletip when active prop is true", () => {
    cy.get("dso-info-button.hydrated")
      .invoke("prop", "active", true)
      .shadow()
      .find("> .dso-tooltip")
      .should("have.class", "visible");

    cy.wait(500).matchImageSnapshot(`${Cypress.currentTest.title}`);
  });
});
