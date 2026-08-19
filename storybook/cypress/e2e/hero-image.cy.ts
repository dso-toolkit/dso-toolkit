describe("Hero Image", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-hero-image--default");
    cy.get("dso-hero-image.hydrated", { timeout: 10000 }).should("exist");
  });

  it("should render the hero image with slotted highlight box", () => {
    cy.get("dso-hero-image.hydrated").as("dsoHeroImage").should("be.visible");

    cy.get("@dsoHeroImage").find("[slot='image']").should("exist");
    cy.get("@dsoHeroImage").find("dso-highlight-box").should("exist");
  });

  it("matches imageSnapshot for breakpoint S", () => {
    cy.viewport(767, 800);
    cy.get("dso-hero-image.hydrated").matchImageSnapshot("hero-image-s");
  });

  it("matches imageSnapshot for breakpoint M", () => {
    cy.viewport(768, 800);
    cy.get("dso-hero-image.hydrated").matchImageSnapshot("hero-image-m");
  });

  it("matches imageSnapshot for breakpoint L", () => {
    cy.viewport(992, 800);
    cy.get("dso-hero-image.hydrated").matchImageSnapshot("hero-image-l");
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.dsoCheckA11y("dso-hero-image.hydrated");
  });
});
