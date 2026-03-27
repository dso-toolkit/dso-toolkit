describe("Project Item", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-project-item--default");
    cy.get("dso-project-item.hydrated").as("projectItem");
  });

  it("should be accessible - default", () => {
    cy.injectAxe();
    cy.dsoCheckA11y("dso-project-item.hydrated");
  });

  it("should matchImageSnapshot", () => {
    cy.get("@projectItem").matchImageSnapshot();
  });

  it("should render and update label prop", () => {
    cy.get("@projectItem").invoke("attr", "label", "InitialLabel");
    cy.get("@projectItem")
      .should("have.attr", "label", "InitialLabel")
      .shadow()
      .find(".project-item-subtitle dso-label")
      .should("contain.text", "InitialLabel");

    cy.get("@projectItem").invoke("attr", "label", "UpdatedLabel");
    cy.get("@projectItem")
      .should("have.attr", "label", "UpdatedLabel")
      .shadow()
      .find(".project-item-subtitle dso-label")
      .should("contain.text", "UpdatedLabel");
  });
});
