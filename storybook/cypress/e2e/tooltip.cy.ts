describe("Tooltip", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-tooltip--as-child");
  });

  function prepareComponent() {
    cy.get("#storybook-root").invoke("attr", "style", "min-height: 360px;");

    cy.get("dso-tooltip.hydrated").closest("button").as("dsoButton");
  }

  it("should show tooltip on hover on button and hide on escape key", () => {
    prepareComponent();

    cy.get("@dsoButton")
      .realHover()
      .get("dso-tooltip.hydrated")
      .should("exist")
      .and("not.have.class", "hidden")
      .get("@dsoButton")
      .type("{esc}")
      .get("dso-tooltip.hydrated")
      .should("exist")
      .and("have.class", "hidden");
  });

  // Temporary test, this shouldn't be needed. Don't copy/paste this.
  it("should look ok", () => {
    prepareComponent();
    cy.get("@dsoButton").matchImageSnapshot();
  });

  it("should show tooltip on focus on button and hide on escape key", () => {
    prepareComponent();

    cy.get("@dsoButton")
      .realClick()
      .get("dso-tooltip.hydrated")
      .should("exist")
      .and("not.have.class", "hidden")
      .get("@dsoButton")
      .type("{esc}")
      .get("dso-tooltip.hydrated")
      .should("exist")
      .and("have.class", "hidden");
  });

  it("should not hide tooltip when hover is in tooltip, but outside button", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-tooltip--as-sibling");

    cy.get("#storybook-root").invoke("attr", "style", "min-height: 360px;");

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
