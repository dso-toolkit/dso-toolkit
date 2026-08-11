describe("Table", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-table--default");
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.dsoCheckA11y("dso-table.hydrated");
  });

  it("should be horizontally scrollable if the table does not fit", () => {
    cy.get("dso-table")
      .as("dsoTable")
      .invoke("attr", "responsive", true)
      .should("not.have.class", "dso-is-responsive")
      .viewport(400, 750)
      .get("@dsoTable")
      .should("have.attr", "is-responsive")
      .get("@dsoTable")
      .shadow()
      .find(".dso-table-body")
      .then(($tableBody) =>
        expect($tableBody[0].scrollWidth).to.be.greaterThan($tableBody[0].getBoundingClientRect().width),
      );

    cy.get("dso-table.hydrated").matchImageSnapshot();
  });

  it("should render the open modal button in the light DOM with aria-controls referencing the table id", () => {
    cy.get("dso-table")
      .find("> table")
      .invoke("attr", "id")
      .should("match", /^dso-table-[0-9a-f-]+$/)
      .then((tableId) =>
        cy
          .get("dso-table > .open-modal-button")
          .should("have.text", "tabel Overzicht van gebruikersnamen vergroten")
          .and("have.attr", "aria-controls", tableId),
      );
  });

  it("should open and close an accessible modal", () => {
    cy.get("dso-table")
      .as("dsoTable")
      .find("> .open-modal-button")
      .should("have.text", "tabel Overzicht van gebruikersnamen vergroten")
      .click()
      .get("@dsoTable")
      .shadow()
      .as("dsoTableShadow")
      .find("dso-modal")
      .as("dsoModal")
      .should("exist")
      .shadow()
      .find(".dso-header h2")
      .should("have.text", "Overzicht van gebruikersnamen")
      .get("@dsoTableShadow")
      .find("dso-modal")
      .shadow()
      .find("#close-modal")
      .click()
      .get("@dsoTableShadow")
      .find("dso-modal")
      .should("not.exist");
  });

  it("should close the table modal with ESCAPE", () => {
    cy.get("dso-table")
      .as("dsoTable")
      .find("> .open-modal-button")
      .click()
      .get("@dsoTable")
      .shadow()
      .as("dsoTableShadow")
      .find("dso-modal")
      .should("exist")
      .realPress("Escape")
      .get("@dsoTableShadow")
      .find("dso-modal")
      .should("not.exist");
  });

  it("should trap focus in the table modal", () => {
    cy.get("dso-table")
      .as("dsoTable")
      .find("> .open-modal-button")
      .click()
      .get("@dsoTable")
      .shadow()
      .as("dsoTableShadow")
      .find("dso-modal")
      .shadow()
      .find("#close-modal")
      .should("be.focused")
      .realPress("Tab")
      .realPress("Tab")
      .get('dso-table a[href="#fabien"]')
      .should("be.focused");
  });
});
