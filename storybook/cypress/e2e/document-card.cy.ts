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

  it("should call dsoDocumentCardClick event when a screen reader dispatches a click on the host", () => {
    cy.get("dso-document-card.hydrated")
      .then(($card) => {
        $card[0]?.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
      })
      .get("@dsoDocumentCardClickListener")
      .should("have.been.calledOnce");
  });

  it("should call dsoDocumentCardClick event when a screen reader dispatches a click on the slotted heading", () => {
    // NVDA in browse mode cannot activate the anchor in the shadow DOM directly
    // (https://github.com/nvaccess/nvda/issues/17845). The component marks the slotted heading as clickable so
    // NVDA dispatches the click on that element.
    cy.get("dso-document-card.hydrated")
      .find("[slot='heading']")
      .then(($heading) => {
        expect($heading[0]?.onclick, "slotted heading should be marked clickable for NVDA").to.be.a("function");

        $heading[0]?.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, composed: true }));
      })
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
      .find("[slot='meta'] > dso-label[status='warning'][compact]")
      .should("exist");

    cy.get("dso-document-card.hydrated").matchImageSnapshot();
  });

  it("should show info button with toggletip next to type", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-document-card--with-type-toelichting")
      .get("dso-document-card.hydrated")
      .find("[slot='type'] > dso-info-button")
      .should("exist");

    cy.get("dso-document-card.hydrated").matchImageSnapshot();
  });

  it("should show two badges next to status text", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-document-card--with-status-toelichting")
      .get("dso-document-card.hydrated")
      .find("[slot='interactions']")
      .within(() => {
        cy.get("dso-badge").first().should("have.attr", "status", "outline");
        cy.get("dso-badge").last().should("have.attr", "status", "warning");
      });

    cy.get("dso-document-card.hydrated").matchImageSnapshot();
  });
});
