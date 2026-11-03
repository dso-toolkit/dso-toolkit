describe("Info", () => {
  it("should be accessible and match snapshot", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-info--default");

    cy.injectAxe();
    cy.dsoCheckA11y("dso-info.hydrated");

    cy.get("dso-info.hydrated").should("exist").matchImageSnapshot();
  });

  it("labels the close button with closeLabel", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-info--default");

    const closeButton = () => cy.get("dso-info.hydrated").shadow().find("dso-icon-button").shadow().find("button");

    closeButton().should("have.attr", "aria-label", "Sluiten");

    cy.get("dso-info.hydrated").invoke("attr", "close-label", "Sluit toelichting bij vraag");

    closeButton().should("have.attr", "aria-label", "Sluit toelichting bij vraag");
  });

  it("passes the element that had focus on activation in the dsoClose event", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-info--default");

    cy.get<HTMLDsoInfoElement>("dso-info.hydrated").then(([info]) => {
      const opener = info!.ownerDocument.createElement("button");
      opener.textContent = "Open";
      info!.before(opener);

      const onClose = cy.stub().as("onClose");
      info!.addEventListener("dsoClose", (e) => onClose(e.detail));

      info!.active = false;
      opener.focus();
      info!.active = true;

      cy.get("dso-info.hydrated").shadow().find("dso-icon-button").shadow().find("button").realClick();

      cy.get("@onClose").should("have.been.calledOnceWith", Cypress.sinon.match({ previousActiveElement: opener }));
    });
  });
});
