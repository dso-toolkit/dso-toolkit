describe("Icon", () => {
  it("is accessible and matches snapshot", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-icon--default");

    cy.injectAxe();
    cy.dsoCheckA11y("dso-icon.hydrated");

    cy.get("dso-icon.hydrated").should("exist").and("be.visible").matchImageSnapshot();
  });

  it("matches snapshot for all icons", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-icon--overview");

    cy.get("#icon-overview-list").should("exist").and("be.visible").matchImageSnapshot();
  });

  it("warns when an invalid icon is used", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-icon--default");

    cy.get("dso-icon.hydrated")
      .then(($el: JQuery<HTMLDsoIconElement>) => {
        // @ts-expect-error Purposefully setting an invalid icon to test the behavior of the component
        $el[0].icon = "invalid-icon";
      })
      .shadow()
      .find(".icon")
      .should("not.exist")
      .get("dso-icon.hydrated")
      .matchImageSnapshot(`${Cypress.currentTest.title} -- invalid icon`);
  });
});
