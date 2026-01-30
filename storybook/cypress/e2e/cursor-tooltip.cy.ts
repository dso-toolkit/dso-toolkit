describe("Cursor Tooltip", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-cursor-tooltip--default");
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.dsoCheckA11y("dso-cursor-tooltip.hydrated");
  });

  it("matches snapshot", () => {
    cy.get("dso-cursor-tooltip.hydrated").matchImageSnapshot();
  });
});
