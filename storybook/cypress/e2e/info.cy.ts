describe("Info", () => {
  it("should be accessible and match snapshot", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-info--default");

    cy.injectAxe();
    cy.dsoCheckA11y("dso-info.hydrated");

    cy.get("dso-info.hydrated").should("exist").matchImageSnapshot();
  });
});
