describe("ActionList", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-action-list--default");
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.dsoCheckA11y("dso-action-list.hydrated");
  });

  it("screenshot", () => {
    cy.get("dso-action-list.hydrated").matchImageSnapshot();
  });
});
