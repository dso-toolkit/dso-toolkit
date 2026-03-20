const selector = "dso-project-item.hydrated";
const projectItemUrl = "http://localhost:45000/iframe.html?id=core-project-item--default";

describe("Project Item", () => {
  beforeEach(() => {
    cy.visit(projectItemUrl);
    cy.get(selector).as("projectItem");
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.dsoCheckA11y(selector);
  });

  it("matches snapshot", () => {
    cy.get("@projectItem").matchImageSnapshot("project-item");
  });

  it("should render and update label prop", () => {
    cy.get("@projectItem").invoke("attr", "label", "InitialLabel");
    cy.get("@projectItem")
      .should("have.attr", "label", "InitialLabel")
      .shadow()
      .find(".project-item-title dso-label")
      .should("contain.text", "InitialLabel");

    cy.get("@projectItem").invoke("attr", "label", "UpdatedLabel");
    cy.get("@projectItem")
      .should("have.attr", "label", "UpdatedLabel")
      .shadow()
      .find(".project-item-title dso-label")
      .should("contain.text", "UpdatedLabel");
  });
});
