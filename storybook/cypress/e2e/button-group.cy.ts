describe("Button Group", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-button-group--default");
  });

  it("is accessible", () => {
    cy.injectAxe();
    cy.dsoCheckA11y("dso-button-group.hydrated");
  });

  it("matches snapshot", () => {
    cy.get("dso-button-group.hydrated").matchImageSnapshot();
  });
});
