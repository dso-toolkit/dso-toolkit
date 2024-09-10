describe("Legend Item", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-legend-item--default");
    prepareComponent();
  });

  const defaultLabelText = "Naam van dit legenda item";

  function prepareComponent() {
    cy.get("dso-legend-item")
      .as("dsoLegendItem")
      .shadow()
      .as("dsoLegendItemShadow")
      .get("@dsoLegendItem")
      .invoke("text", defaultLabelText)
      .get("@dsoLegendItem")
      .invoke(
        "append",
        `<span slot="symbol"><span class="symboolcode" data-symboolcode="regelingsgebied"></span></span>`,
      );
  }

  it("should be accessible", () => {
    cy.injectAxe();
    cy.checkA11y("dso-legend-item");
  });

  it("should show label and symbol", () => {
    cy.get("@dsoLegendItem")
      .should("have.text", defaultLabelText)
      .get("@dsoLegendItemShadow")
      .find(".legend-item")
      .should("have.class", "legend-item-symbol");
  });

  it("should emit removeClick event", () => {
    cy.get("@dsoLegendItem")
      .then(($element) => $element.on("dsoRemoveClick", cy.stub().as("removeClickListener")))
      .should("have.text", defaultLabelText)
      .invoke("prop", "removable", true)
      .get("@dsoLegendItemShadow")
      .find("#remove-button")
      .click()
      .get("@removeClickListener")
      .should("have.been.calledOnce");
  });

  it("should show selectable with label", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-legend-item--with-selectable");

    cy.injectAxe();
    cy.checkA11y("dso-legend-item");

    cy.get("dso-legend-item")
      .find("dso-selectable")
      .should("be.visible")
      .get("dso-legend-item")
      .invoke("prop", "disabled", true)
      .invoke("prop", "disabledMessage", "Doet het niet")
      .shadow()
      .find("dso-toggletip")
      .should("be.visible")
      .and("have.text", "Doet het niet");
  });

  it("should show edit-button with a body containing input-range", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-legend-item--with-input-range");

    cy.injectAxe();
    cy.checkA11y("dso-legend-item");

    cy.get("dso-legend-item")
      .find("div[slot='body']")
      .should("be.hidden")
      .get("dso-legend-item")
      .shadow()
      .find("#edit-button")
      .click()
      .get("dso-legend-item")
      .find("div[slot='body'] dso-input-range")
      .should("be.visible")
      .get("dso-legend-item")
      .shadow()
      .find("#edit-button")
      .click()
      .get("dso-legend-item")
      .find("div[slot='body']")
      .should("be.hidden");
  });

  it("should show edit-button with a body containing selectables", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-legend-item--with-selectables");

    cy.injectAxe();
    cy.checkA11y("dso-legend-item");

    cy.get("dso-legend-item")
      .find("div[slot='body']")
      .should("be.hidden")
      .get("dso-legend-item")
      .shadow()
      .find("#edit-button")
      .click()
      .get("dso-legend-item")
      .find("div[slot='body'] dso-selectable")
      .should("be.visible")
      .get("dso-legend-item")
      .shadow()
      .find("#edit-button")
      .click()
      .get("dso-legend-item")
      .find("div[slot='body']")
      .should("be.hidden");
  });
});
