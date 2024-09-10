describe("ActionList", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-action-list--default");
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.checkA11y("dso-action-list");
  });

  it("screenshot", () => {
    cy.get("dso-action-list.hydrated").matchImageSnapshot();
  });
});
