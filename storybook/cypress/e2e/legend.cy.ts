describe("Legend", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-legend--legenda");
    cy.get("dso-legend.hydrated").as("dsoLegend").shadow().as("dsoLegendShadow");
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.dsoCheckA11y("dso-legend.hydrated");
  });

  it("should show the topbar and a close icon button", () => {
    cy.get("@dsoLegendShadow").find(".tab").should("include.text", "Legenda").should("have.class", "dso-active");
    cy.get("@dsoLegendShadow").find(".dso-close-button");

    cy.get("@dsoLegend").matchImageSnapshot(`${Cypress.currentTest.title}`);
  });

  it("should emit the dsoContentSwitch event when clicked on a topbar tab item", () => {
    cy.get("@dsoLegend")
      .then(($element) => $element.on("dsoContentSwitch", cy.stub().as("dsoContentSwitchListener")))
      .get("@dsoLegendShadow")
      .find(".tab.dso-active")
      .click()
      .get("@dsoContentSwitchListener")
      .should("have.been.calledOnce");
  });

  it("should emit the dsoClose event when clicked on a close icon button", () => {
    cy.get("@dsoLegend")
      .then(($element) => $element.on("dsoClose", cy.stub().as("dsoCloseListener")))
      .get("@dsoLegendShadow")
      .find(".dso-close-button")
      .click()
      .get("@dsoCloseListener")
      .should("have.been.calledOnce");
  });

  it("should show a scrollbar when the content in the slot is heigher than 600px", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-legend--kaartlagen");
    cy.get("dso-legend.hydrated").as("dsoLegend").shadow().as("dsoLegendShadow");

    cy.get("@dsoLegend").contains("dso-legend-item", "Provinciegrenzen").shadow().find("dso-icon-button").realClick();
    cy.wait(200)
      .get("@dsoLegend")
      .contains("dso-legend-item", "Landgrenzen")
      .shadow()
      .find("dso-icon-button")
      .realClick();
    cy.wait(200)
      .get("@dsoLegend")
      .contains("dso-legend-item", "Topgrafie (BRT)")
      .shadow()
      .find("dso-icon-button")
      .realClick();

    cy.get("@dsoLegend").matchImageSnapshot(`${Cypress.currentTest.title}`);
  });
});
