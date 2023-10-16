describe("Logo", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-logo--default");
  });

  it("shows a label", () => {
    cy.get("dso-logo").invoke("attr", "label", "Beheerportaal").shadow().find(".logo-label").should("be.visible");
  });

  it("only shows a label on smaller screens", () => {
    cy.viewport(400, 720);
    cy.get("dso-logo")
      .invoke("attr", "label", "Beheerportaal")
      .shadow()
      .find(".logo-label")
      .should("be.visible")
      .find(".logo-wordmark")
      .should("not.exist");
  });

  it("shows the beta tag", () => {
    cy.get("dso-logo").invoke("attr", "ribbon", "beta").shadow().find(".logo-ribbon").should("be.visible");
  });

  it("should be accessible", () => {
    cy.percySnapshot();

    cy.injectAxe();
    cy.checkA11y("dso-logo");
  });
});
