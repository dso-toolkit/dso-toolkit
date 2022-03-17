describe("Image overlay", () => {
  beforeEach(() => {
    cy.visit(
      "http://localhost:56106/iframe.html?id=image-overlay--image-overlay"
    );
    cy.injectAxe();
    cy.wait(500);
    cy.get("dso-image-overlay").eq(0).as("first-overlay");
    cy.get("@first-overlay")
      .shadow()
      .find("button.open")
      .as("first-open-button");
    cy.get("dso-image-overlay").eq(1).as("second-overlay");
    cy.get("@second-overlay")
      .shadow()
      .find("button.open")
      .as("second-open-button");
  });

  it("should show open button on hover", () => {
    cy.checkA11y("dso-image-overlay");
    cy.get("@first-open-button").should("not.be.visible");
    cy.get("@first-overlay").realHover();
    cy.get("@first-open-button").should("be.visible");
    cy.checkA11y("dso-image-overlay");
  });

  it("should show open button on tab", () => {
    cy.checkA11y("dso-image-overlay");
    cy.get("@first-overlay").realHover();
    cy.get("@first-open-button").focus();
    cy.get("@first-overlay").realPress("Tab").realPress("Tab");
    cy.get("@second-open-button").should("be.visible");
    cy.checkA11y("dso-image-overlay");
  });

  it("should open overlay on click", () => {
    cy.get("@first-overlay").realHover();
    cy.get("@first-open-button").click();
    cy.checkA11y("dso-image-overlay");
    cy.checkA11y("dso-image-overlay-overlay");
  });

  it("should close overlay on click", () => {
    cy.get("@first-overlay").realHover();
    cy.get("@first-open-button").click();
    cy.checkA11y("dso-image-overlay");
    cy.checkA11y("dso-image-overlay-overlay");
    cy.get("dso-image-overlay-overlay")
      .eq(0)
      .shadow()
      .find("button.close")
      .click();
    cy.get("dso-image-overlay-overlay").should("not.exist");
  });
});
