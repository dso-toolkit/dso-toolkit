describe("AdvancedSelect", () => {
  describe("accessibility and snapshots", () => {
    const stories = ["default", "placeholder"];
    for (const story of stories) {
      it(`${story} is accessible`, () => {
        cy.visit(`http://localhost:45000/iframe.html?id=core-advanced-select--${story}`);

        cy.injectAxe();
        cy.dsoCheckA11y("dso-advanced-select.hydrated");

        cy.get("dso-advanced-select").click().shadow().find(".groups-container").should("exist");

        cy.dsoCheckA11y("dso-advanced-select.hydrated");
      });

      it(`${story} matches snapshot closed`, () => {
        cy.visit(`http://localhost:45000/iframe.html?id=core-advanced-select--${story}`);

        cy.get("dso-advanced-select.hydrated").matchImageSnapshot(`advanced-select--${story}`);
      });

      it(`${story} matches snapshot open`, () => {
        cy.visit(`http://localhost:45000/iframe.html?id=core-advanced-select--${story}`);

        cy.get("dso-advanced-select.hydrated").click().shadow().find(".groups-container").should("exist");

        cy.matchImageSnapshot(`${Cypress.currentTest.title} - ${story} - open`, {
          capture: "viewport",
        });
      });
    }
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

    cy.get("dso-advanced-select.hydrated").shadow().find("button.active-option").find("dso-label").should("exist");
  });

  it("delegates focus to first interactive element when clicked on some non-interactive part", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-advanced-select--default");

    // Click between both Badges 30 pixels from the top
    cy.get("dso-advanced-select.hydrated").realClick({ x: 954, y: 30 });

    cy.get("dso-advanced-select.hydrated").shadow().find("button.active-option").should("be.focused");
  });

  it("delegates focus to first interactive element when focus() is called", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-advanced-select--default");

    cy.get("dso-advanced-select.hydrated")
      .invoke("get", 0)
      .as("advancedSelectElement")
      .invoke("focus")
      .get("dso-advanced-select.hydrated")
      .shadow()
      .find("button.active-option")
      .should("be.focused");
  });
});
