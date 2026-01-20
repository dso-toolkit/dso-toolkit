describe("Info Button", () => {
  const variants = ["inactive", "active", "secondary-inactive", "secondary-active", "with-toggletip"];

  variants.forEach((variant) => {
    it(`${variant} should be accessible and match snapshot`, () => {
      cy.visit(`http://localhost:45000/iframe.html?id=core-info-button--${variant}`);
      cy.injectAxe();
      cy.dsoCheckA11y("dso-info-button.hydrated");
      cy.get("dso-info-button.hydrated").matchImageSnapshot(`${Cypress.currentTest.title}`);
    });
  });

  describe("with toggletip", () => {
    beforeEach(() => {
      cy.visit("http://localhost:45000/iframe.html?id=core-info-button--with-toggletip");
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
      cy.get("dso-info-button.hydrated")
        .realClick()
        .shadow()
        .find("> .dso-tooltip")
        .should("not.have.class", "visible");
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
});
