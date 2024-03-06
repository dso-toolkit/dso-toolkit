describe("Logo", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-logo--default");
  });

  it("not shows a label", () => {
    cy.get("dso-logo")
      .should("not.have.attr", "label", "Beheerportaal")
      .shadow()
      .find(".logo-label")
      .should("not.exist");
    cy.get("dso-logo").shadow().find(".logo-wordmark").should("exist");
    // cy.percySnapshot();
    cy.injectAxe();
    cy.checkA11y("dso-logo");
  });

  it("shows a label and logo-wordmark on screens wider than 767px", () => {
    cy.get("dso-logo")
      .invoke("prop", "label", "Beheerportaal")
      .should("have.attr", "label", "Beheerportaal")
      .shadow()
      .find(".logo-label")
      .should("be.visible");
    cy.get("dso-logo").invoke("prop", "label", "Beheerportaal").shadow().find(".logo-wordmark").should("be.visible");
    // cy.percySnapshot();
    cy.injectAxe();
    cy.checkA11y("dso-logo");
  });

  it("shows a label and no logo-wordmark on screens smaller than 768px", () => {
    cy.viewport(400, 720);
    cy.get("dso-logo")
      .invoke("prop", "label", "Beheerportaal")
      .should("have.attr", "label", "Beheerportaal")
      .shadow()
      .find(".logo-label")
      .should("be.visible")
      .should("have.text", "Beheerportaal");
    cy.get("dso-logo")
      .invoke("prop", "label", "Beheerportaal")
      .shadow()
      .find(".logo-wordmark")
      .should("not.be.visible");
    // cy.percySnapshot();
    cy.injectAxe();
    cy.checkA11y("dso-logo");
  });

  it("shows the beta tag", () => {
    cy.get("dso-logo")
      .invoke("attr", "ribbon", "beta")
      .shadow()
      .find(".logo-ribbon")
      .should("be.visible")
      .should("have.text", "beta");
    // cy.percySnapshot();
    cy.injectAxe();
    cy.checkA11y("dso-logo");
  });

  it("should be accessible", () => {
    // cy.percySnapshot();
    cy.injectAxe();
    cy.checkA11y("dso-logo");
  });
});
