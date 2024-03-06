describe("Toggletip", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-toggletip--toggletip");
  });

  function prepareComponent() {
    cy.get("dso-toggletip")
      .as("dsoToggletip")
      .shadow()
      .find("dso-info-button")
      .as("dsoInfoButton")
      .shadow()
      .find("button")
      .as("dsoButton")
      .get("@dsoToggletip")
      .shadow()
      .find("dso-tooltip")
      .as("dsoTooltip");
  }

  it("should focus on button after escape", () => {
    prepareComponent();

    // cy.percySnapshot();

    cy.get("@dsoButton")
      .click()
      .get("@dsoTooltip")
      .should("not.have.class", "hidden")
      .realPress("Tab")
      .get("@dsoButton")
      .should("not.have.focus")
      .realPress("Escape")
      .get("@dsoButton")
      .should("have.focus");
  });
});
