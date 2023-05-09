describe("Expandable Heading", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-expandable-heading--default");
    cy.injectAxe();
    cy.get("dso-expandable-heading")
      .shadow()
      .as("dsoExpandableHeading")
      .find(".expandable-heading > h3 > button")
      .as("toggleButton");
  });

  it("should be accessible", () => {
    cy.checkA11y("dso-expandable-heading");
    cy.get("@dsoExpandableHeading")
      .find("dso-expandable")
      .should("have.attr", "id")
      .get("@toggleButton")
      .should("have.attr", "aria-controls")
      .get("@toggleButton")
      .should("have.attr", "aria-expanded", "false")
      .get("dso-expandable-heading")
      .find('dso-ozon-content[slot="title"]')
      .click()
      .get("@toggleButton")
      .should("have.attr", "aria-expanded", "true");
  });

  it("should open and close when heading is clicked", () => {
    cy.get("@dsoExpandableHeading")
      .find("dso-expandable")
      .should("not.be.visible")
      .get("dso-expandable-heading")
      .find('dso-ozon-content[slot="title"]')
      .click()
      .get("@dsoExpandableHeading")
      .find("dso-expandable")
      .should("be.visible")
      .percySnapshot();
  });

  it("should show delete", () => {
    cy.get("dso-expandable-heading")
      .invoke("attr", "edit-action", "delete")
      .get("dso-expandable-heading")
      .should("have.class", "dso-del")
      .find('dso-ozon-content[slot="title"]')
      .click()
      .get("@dsoExpandableHeading")
      .find(".dso-edit-action-text")
      .should("exist")
      .should("have.text", "verwijderd:");
  });

  it("should show insert", () => {
    cy.get("dso-expandable-heading")
      .invoke("attr", "edit-action", "insert")
      .get("dso-expandable-heading")
      .should("have.class", "dso-ins")
      .find('dso-ozon-content[slot="title"]')
      .click()
      .get("@dsoExpandableHeading")
      .find(".dso-edit-action-text")
      .should("exist")
      .should("have.text", "toegevoegd:");
  });
});
