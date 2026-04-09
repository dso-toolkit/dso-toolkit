describe("Project Item", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-project-item--default");
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.dsoCheckA11y("dso-project-item.hydrated");
  });

  it("matches snapshot", () => {
    cy.get("dso-project-item.hydrated").matchImageSnapshot();
  });
});
