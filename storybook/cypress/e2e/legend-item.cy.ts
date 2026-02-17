describe("Legend Item", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-legend-item--default");
    cy.get("dso-legend-item.hydrated").as("dsoLegendItem").shadow().as("dsoLegendItemShadow");
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.dsoCheckA11y("dso-legend-item.hydrated");
  });

  it("should show label and symbol", () => {
    cy.get("@dsoLegendItem")
      .should("include.text", "Legenda item label")
      .get("@dsoLegendItemShadow")
      .find(".legend-item")
      .should("have.class", "legend-item-symbol");

    cy.get("@dsoLegendItem").matchImageSnapshot(`${Cypress.currentTest.title}`);
  });

  it("shows a Slide Toggle with accessible label", () => {
    cy.get("@dsoLegendItemShadow")
      .find("dso-slide-toggle button")
      .should("have.attr", "aria-label", "Maak legenda item label actief");
  });

  it("should hide the edit button and disable the slide-toggle", () => {
    cy.get("@dsoLegendItem")
      .invoke("prop", "disabled", true)
      .invoke("prop", "disabledMessage", "Deze kaartlaag is uitgeschakeld")
      .shadow()
      .find("#options-button")
      .should("not.exist")
      .get("@dsoLegendItem")
      .shadow()
      .find(".dso-slider")
      .should("be.disabled")
      .get("@dsoLegendItem")
      .shadow()
      .find("dso-toggletip")
      .should("exist");

    cy.get("@dsoLegendItem").matchImageSnapshot(`${Cypress.currentTest.title} -- disabled true`);

    cy.get("@dsoLegendItem")
      .invoke("prop", "disabled", false)
      .invoke("prop", "disabledMessage", "")
      .shadow()
      .find("#options-button")
      .should("exist")
      .get("@dsoLegendItem")
      .shadow()
      .find(".dso-slider")
      .should("not.be.disabled");
  });

  it("should hide the edit button when the slider is not active", () => {
    cy.get("@dsoLegendItem").invoke("prop", "active", false).shadow().find("#options-button").should("not.exist");
    cy.get("@dsoLegendItem").matchImageSnapshot(`${Cypress.currentTest.title}`);
  });

  it("should show the edit button when the slider is active", () => {
    cy.get("@dsoLegendItem").invoke("prop", "active", true).shadow().find("#options-button").should("be.visible");
    cy.get("@dsoLegendItem").matchImageSnapshot(`${Cypress.currentTest.title}`);
  });

  it("should show the options containing an input-range when clicked on options-button", () => {
    cy.get("@dsoLegendItem")
      .find("div[slot='options'] dso-input-range")
      .should("be.hidden")
      .get("dso-legend-item")
      .shadow()
      .find("#options-button")
      .click()
      .get("dso-legend-item")
      .find("div[slot='options'] dso-input-range")
      .should("be.visible");

    cy.get("@dsoLegendItem").matchImageSnapshot(`${Cypress.currentTest.title} -- show options`);

    cy.get("dso-legend-item")
      .shadow()
      .find("#options-button")
      .click()
      .get("dso-legend-item")
      .find("div[slot='options']")
      .should("be.hidden");
  });

  it("should emit ActiveChange event", () => {
    cy.get("@dsoLegendItem")
      .then(($element) => $element.on("dsoActiveChange", cy.stub().as("activeChangeListener")))
      .get("@dsoLegendItemShadow")
      .find("dso-slide-toggle")
      .click()
      .get("@activeChangeListener")
      .should("have.been.calledOnce");
  });

  it("should show an active Slide Toggle", () => {
    cy.get("@dsoLegendItem")
      .invoke("prop", "active", true)
      .get("@dsoLegendItemShadow")
      .find("dso-slide-toggle button")
      .should("have.attr", "aria-checked", "true")
      .wait(400);

    cy.get("@dsoLegendItem").matchImageSnapshot(`${Cypress.currentTest.title} -- active Slide Toggle`);
  });

  it("should not show a slide-toggle when activatable is false", () => {
    cy.get("dso-legend-item").invoke("prop", "activatable", false);
    cy.get("@dsoLegendItemShadow").find("dso-slide-toggle button").should("not.exist");

    cy.get("@dsoLegendItem").matchImageSnapshot(`${Cypress.currentTest.title} -- without Slide Toggle`);
  });

  it("should not show a symbol when slot symbol is removed", () => {
    cy.get("@dsoLegendItem")
      .get("[slot='symbol']")
      .invoke("remove")
      .get("@dsoLegendItemShadow")
      .find('[name="symbol"]')
      .should("not.exist");

    cy.get("@dsoLegendItem").matchImageSnapshot(`${Cypress.currentTest.title} -- without symbol`);
  });

  it("should not show a options-button when slot options is removed", () => {
    cy.get("@dsoLegendItem")
      .get("[slot='options']")
      .invoke("remove")
      .get("@dsoLegendItemShadow")
      .find("#options-button")
      .should("not.exist");

    cy.get("@dsoLegendItem").matchImageSnapshot(`${Cypress.currentTest.title} -- without options-button`);
  });

  it("should show delete button in edit mode", () => {
    cy.get("@dsoLegendItem").invoke("prop", "mode", "edit");
    cy.get("@dsoLegendItemShadow").find("#delete-button").should("exist");
  });

  it("should not show slide-toggle in edit mode", () => {
    cy.get("@dsoLegendItem").invoke("prop", "mode", "edit");
    cy.get("@dsoLegendItemShadow").find("dso-slide-toggle").should("not.exist");
  });

  it("should not show options-button in edit mode", () => {
    cy.get("@dsoLegendItem").invoke("prop", "mode", "edit");
    cy.get("@dsoLegendItemShadow").find("#options-button").should("not.exist");
  });

  it("should emit dsoDelete event when delete button is clicked in edit mode", () => {
    cy.get("@dsoLegendItem")
      .invoke("prop", "mode", "edit")
      .then(($element) => $element.on("dsoDelete", cy.stub().as("dsoDeleteListener")));
    cy.get("@dsoLegendItemShadow").find("#delete-button").shadow().find("button").click();
    cy.get("@dsoDeleteListener").should("have.been.calledOnce");
  });
});
