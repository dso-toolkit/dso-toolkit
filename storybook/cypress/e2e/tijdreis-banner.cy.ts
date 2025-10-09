describe("Contact information", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-tijdreis-banner--default");
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.dsoCheckA11y("dso-tijdreis-banner.hydrated");
  });

  it("matches snapshot", () => {
    cy.get(`dso-tijdreis-banner.hydrated`).matchImageSnapshot();
  });

  it("matches snapshot on sm breakpoint", () => {
    cy.viewport(320, 660);
    cy.get(`dso-tijdreis-banner.hydrated`).matchImageSnapshot("tijdreis-banner-sm-breakpoint");
  });
});
