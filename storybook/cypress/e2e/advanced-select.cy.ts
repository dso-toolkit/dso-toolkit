describe("AdvancedSelect", () => {
  it("should be accessible", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-advanced-select--default");
    cy.injectAxe();
    cy.checkA11y("dso-advanced-select");

    cy.get("dso-advanced-select.hydrated").matchImageSnapshot("advanced-select--default");
  });

  it("should show and hide options when active-option-button is clicked", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-advanced-select--default");

    cy.get("dso-advanced-select.hydrated").shadow().find("button.active-option").as("active-option-button");

    cy.get("@active-option-button")
      .should("not.have.class", "open")
      .find(".group-container")
      .should("not.exist")
      .get("@active-option-button")
      .click()
      .get("@active-option-button")
      .should("have.class", "open")
      .get("dso-advanced-select.hydrated")
      .shadow()
      .find(".groups-container")
      .should("exist")
      .find(".groups")
      .should("exist");
  });

  it("should show active hint on active option when options are shown", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-advanced-select--default&args=activeIndex:2");

    cy.get("dso-advanced-select.hydrated").shadow().find("button.active-option").as("active-option-button");

    cy.get("@active-option-button")
      .click()
      .get("dso-advanced-select.hydrated")
      .shadow()
      .find(".groups .group:first .options li:first .option-hint")
      .should("not.exist")
      .get("dso-advanced-select.hydrated")
      .shadow()
      .find(".groups .group:nth-child(2) .options li:nth-child(2) .option-hint")
      .should("exist");
  });

  it("should show activeLabel on active option", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-advanced-select--default&args=activeIndex:2");

    cy.get("dso-advanced-select.hydrated").shadow().find("button.active-option").as("active-option-button");

    cy.get("@active-option-button").find("dso-label").should("exist");

    cy.get("dso-advanced-select.hydrated").matchImageSnapshot(`${Cypress.currentTest.title}`);
  });
});
