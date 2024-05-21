describe("ActionList", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-action-list--default");
  });

  it("screenshot", () => {
    cy.get("dso-action-list.hydrated").matchImageSnapshot();
  });
});
