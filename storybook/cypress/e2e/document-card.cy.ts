describe("Document Card", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-document-card--default")
      .get("dso-document-card.hydrated")
      .then(($card) => {
        $card.on("dsoDocumentCardClick", cy.stub().as("dsoDocumentCardClickListener"));
      });
  });

  it("should be accessible - default", () => {
    cy.injectAxe();
    cy.dsoCheckA11y("dso-document-card.hydrated");
  });

  it("screenshot", () => {
    cy.get("dso-document-card.hydrated").matchImageSnapshot();
  });

  it("should call dsoDocumentCardClick event when user clicks the title in the heading", () => {
    cy.get("dso-document-card.hydrated")
      .shadow()
      .find(".dso-document-card-heading > a")
      .realClick()
      .get("@dsoDocumentCardClickListener")
      .should("have.been.calledOnce");
  });

  it("should show different background-color when active='true'", () => {
    cy.get("dso-document-card.hydrated")
      .invoke("prop", "active", true)
      .shadow()
      .find(".dso-document-card-container")
      .should("have.css", "background-color", "rgb(229, 229, 229)");

    cy.get("dso-document-card.hydrated").matchImageSnapshot();
  });

  it("should show compact label with status='warning'", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-document-card--with-label")
      .get("dso-document-card.hydrated")
      .find("dso-label[status='warning'][compact]")
      .should("exist");

    cy.get("dso-document-card.hydrated").matchImageSnapshot();
  });

  it("should show toggletip next to type", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-document-card--with-type-toelichting")
      .get("dso-document-card.hydrated")
      .find("[slot='type'] > dso-toggletip")
      .should("exist");

    cy.get("dso-document-card.hydrated").matchImageSnapshot();
  });

  it("should show two badges next to status text", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-document-card--with-status-toelichting")
      .get("dso-document-card.hydrated")
      .find("[slot='status']")
      .within(() => {
        cy.get("dso-badge").first().should("have.attr", "status", "outline");
        cy.get("dso-badge").last().should("have.attr", "status", "warning");
      });

    cy.get("dso-document-card.hydrated").matchImageSnapshot();
  });
});
