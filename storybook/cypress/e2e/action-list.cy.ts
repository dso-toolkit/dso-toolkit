describe("ActionList", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-actionlist--default");
  });

  it("screenshot", () => {
    cy.percySnapshot();
  });
});
