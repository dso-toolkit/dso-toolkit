describe("Segmented Button", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-segmented-button--default");
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.dsoCheckA11y("dso-segmented-button.hydrated");
  });

  it("matches snapshot", () => {
    cy.get("dso-segmented-button.hydrated").matchImageSnapshot();
  });
});
