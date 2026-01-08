describe("Button Group", () => {
  it("is accessible", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-button-group--default");
    cy.injectAxe();
    cy.dsoCheckA11y("dso-button-group.hydrated");
  });

  const directions = ["row", "column"];
  const buttonElements = ["button", "anchor", "icon-button"];

  for (const direction of directions) {
    for (const buttonElement of buttonElements) {
      it(`matches snapshot ${direction} of ${buttonElement}`, () => {
        cy.visit(
          `http://localhost:45000/iframe.html?id=core-button-group--default&args=buttonElement:${buttonElement}`,
        );
        cy.get("dso-button-group.hydrated").invoke("prop", direction).matchImageSnapshot();
      });
    }
  }
});
