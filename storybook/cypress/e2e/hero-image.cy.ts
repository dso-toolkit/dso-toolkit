describe("Hero Image", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-hero-image--default");
    cy.get("dso-hero-image.hydrated", { timeout: 10000 }).should("exist");
  });

  it("should render the hero image with slotted rich content", () => {
    cy.get("dso-hero-image.hydrated").as("dsoHeroImage").should("be.visible").and("have.attr", "image-url");

    cy.get("@dsoHeroImage").shadow().find(".hero-image-container").should("be.visible");
    cy.get("@dsoHeroImage").find(".dso-rich-content").should("contain.text", "Vergunningcheck");
  });

  it("matches imageSnapshot", () => {
    cy.get("dso-hero-image.hydrated").matchImageSnapshot();
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.dsoCheckA11y("dso-hero-image.hydrated");
  });
});
