describe("Image Overlay", () => {
  beforeEach(() => {
    cy.visit(
      "http://localhost:56106/iframe.html?id=image-overlay--image-overlay"
    );
    cy.injectAxe();
    cy.wait(500);

    cy.get("dso-image-overlay")
      .shadow()
      .find("button.open")
      .as("open-button");
  });

  it("should show open button on hover", () => {
    cy.checkA11y("dso-image-overlay");
    cy.get('@open-button').should("not.be.visible");
    cy.get("dso-image-overlay").realHover();
    cy.get("@open-button").should("be.visible");
    cy.checkA11y("dso-image-overlay");
  });

  it("should show open button on tab", () => {
    cy.checkA11y("dso-image-overlay");
    cy.get("dso-image-overlay").realHover();
    cy.get("@open-button").focus().should("be.visible");
    cy.checkA11y("dso-image-overlay");
  });

  it('should open overlay on click', () => {
    cy.get("@open-button").focus().click();
    cy.get('dso-image-overlay').shadow().find('.wrapper > img').should('be.visible');
    cy.checkA11y("dso-image-overlay");
  });

  it("should close overlay on click", () => {
    cy.get("@open-button").focus().click();
    cy.get('dso-image-overlay').shadow().find('button.close').click();
    cy.get('dso-image-overlay').shadow().find('.wrapper > img').should('not.exist');
  });
});
