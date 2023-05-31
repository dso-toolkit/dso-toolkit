describe("Tooltip", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-tooltip--as-child");
  });

  function prepareComponent() {
    cy.get("#root").invoke("attr", "style", "min-height: 360px;");

    cy.get("dso-tooltip").closest("button").as("dsoButton");
  }

  it("should show tooltip on hover on button and hide on escape key", () => {
    prepareComponent();

    cy.get("@dsoButton")
      .trigger("mouseover")
      .find("dso-tooltip")
      .should("not.have.class", "hidden")
      .realPress("Escape")
      .get("@dsoButton")
      .find("dso-tooltip")
      .should("have.class", "hidden");
  });

  // Temporary test, this shouldn't be needed. Don't copy/paste this.
  it("should look ok", () => {
    cy.percySnapshot();
  });

  it.skip("should show tooltip on focus on button and hide on escape key", () => {
    prepareComponent();

    cy.get("@dsoButton")
      .wait(100)
      .realClick()
      .wait(200)
      .find("dso-tooltip")
      .should("not.have.class", "hidden")
      .wait(250)
      .realPress("Escape")
      .wait(200)
      .get("@dsoButton")
      .find("dso-tooltip")
      .should("have.class", "hidden");
  });

  it("should not hide tooltip when hover is in tooltip, but outside button", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-tooltip--as-sibling");

    cy.get("#root").invoke("attr", "style", "min-height: 360px;");

    cy.get("dso-tooltip")
      .as("dsoTooltip")
      .should("have.class", "hidden")
      .prev()
      .should("have.attr", "type", "button")
      .as("dsoButton");

    cy.get("@dsoButton")
      .trigger("mouseenter")
      .get("@dsoTooltip")
      .should("not.have.class", "hidden")
      .get("@dsoTooltip")
      .realHover()
      .should("not.have.class", "hidden");
  });
});
