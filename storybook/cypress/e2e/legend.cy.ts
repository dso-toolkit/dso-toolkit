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
    cy.get("@dsoLegendShadow").find(".tab").should("include.text", "Legenda").should("have.class", "active");
    cy.get("@dsoLegendShadow").find(".close-button");

    cy.get("@dsoLegend").matchImageSnapshot(`${Cypress.currentTest.title}`);
  });

  it("should emit the dsoContentSwitch event when clicked on a topbar tab item", () => {
    cy.get("@dsoLegend")
      .then(($element) => $element.on("dsoContentSwitch", cy.stub().as("dsoContentSwitchListener")))
      .get("@dsoLegendShadow")
      .find(".tab:not(.active)")
      .click()
      .get("@dsoContentSwitchListener")
      .should("have.been.calledOnce");
  });

  it("should not emit the dsoContentSwitch event when clicked on a topbar active tab item", () => {
    cy.get("@dsoLegend")
      .then(($element) => $element.on("dsoContentSwitch", cy.stub().as("dsoContentSwitchListener")))
      .get("@dsoLegendShadow")
      .find(".tab.active")
      .click()
      .get("@dsoContentSwitchListener")
      .should("not.have.been.calledOnce");
  });

  it("should emit the dsoClose event when clicked on a close icon button", () => {
    cy.get("@dsoLegend")
      .then(($element) => $element.on("dsoClose", cy.stub().as("dsoCloseListener")))
      .get("@dsoLegendShadow")
      .find(".close-button")
      .click()
      .get("@dsoCloseListener")
      .should("have.been.calledOnce");
  });

  it("should place focus to next and previous tabs with arrow keys", () => {
    cy.get("@dsoLegendShadow").find(".tab:nth-child(1)").focus();

    cy.realPress("ArrowRight");

    cy.get("@dsoLegendShadow").find(".tab:nth-child(2)").should("have.focus");

    cy.realPress("ArrowLeft");

    cy.get("@dsoLegendShadow").find(".tab:nth-child(1)").should("have.focus");
  });

  it("should show a scrollbar when the content in the slot is heigher than 600px", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-legend--kaartlagen");
    cy.get("dso-legend.hydrated").as("dsoLegend").shadow().as("dsoLegendShadow");

    cy.get("@dsoLegend")
      .contains("dso-legend-item", "Provinciegrenzen")
      .shadow()
      .within(() => {
        cy.get("dso-icon-button").realClick();
        cy.get("div.options").should("not.have.attr", "hidden");
      });

    cy.get("@dsoLegend")
      .contains("dso-legend-item", "Landgrenzen")
      .shadow()
      .within(() => {
        cy.get("dso-icon-button").realClick();
        cy.get("div.options").should("not.have.attr", "hidden");
      });

    cy.get("@dsoLegend")
      .contains("dso-legend-item", "Topgrafie (BRT)")
      .shadow()
      .within(() => {
        cy.get("dso-icon-button").realClick();
        cy.get("div.options").should("not.have.attr", "hidden");
      });

    cy.get("@dsoLegend").matchImageSnapshot(`${Cypress.currentTest.title}`);
  });
});
