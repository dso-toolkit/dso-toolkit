describe("Modal", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-modal--confirm")
      .get("dso-modal")
      .then(($modal) => {
        $modal.on("dsoClose", cy.stub().as("dsoCloseListener"));
      })
      .shadow()
      .as("dsoModal");
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.checkA11y("dso-modal");
    cy.get("@dsoModal")
      .find(".dso-modal")
      .should("have.attr", "role", "dialog")
      .and("have.attr", "aria-modal", "true")
      .and("have.attr", "aria-labelledby")
      .get("@dsoModal")
      .find(".dso-dialog")
      .should("have.attr", "role", "document")
      .find(".dso-close span")
      .should("have.class", "sr-only")
      .and("have.text", "Sluiten");

    cy.percySnapshot();
  });

  it("should have focus trap", () => {
    cy.get("@dsoModal")
      .find(".dso-close")
      .should("have.focus")
      .realPress("Tab")
      .get("@dsoModal")
      .find(".dso-body")
      .should("have.focus")
      .realPress("Tab")
      .get("dso-modal")
      .find('[slot="body"] > p > a')
      .should("have.focus")
      .realPress("Tab")
      .get("dso-modal")
      .find("[slot='footer'] button.dso-secondary")
      .should("have.focus")
      .realPress("Tab")
      .get("dso-modal")
      .find("[slot='footer'] button.dso-primary")
      .should("have.focus")
      .realPress("Tab")
      .get("@dsoModal")
      .find(".dso-close")
      .should("not.have.focus");
  });

  it("should emit dsoClose event when user closes modal", () => {
    cy.get("@dsoModal").find(".dso-close").click().get("@dsoCloseListener").should("have.been.calledOnce");
  });

  it("should emit dsoClose event on escape press", () => {
    cy.get("dso-modal:focus-within").realPress("Escape").get("@dsoCloseListener").should("have.been.calledOnce");
  });

  it("should not emit dsoClose upon disconnecting", () => {
    cy.get("dso-modal").should("have.class", "hydrated").shadow().find(".dso-body").should("exist");

    cy.get("dso-modal").then(($dsoModal) => $dsoModal[0].addEventListener("dsoClose", cy.stub().as("close")));

    cy.get("dso-modal").invoke("remove").should("not.exist");

    cy.get("@close").should("not.have.been.called");
  });

  it("should have keyboard accessible body container", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-modal--passive");

    cy.get("dso-modal").shadow().find(".dso-body").as("modalBody");
    cy.get("dso-modal").shadow().find("dso-scrollable").shadow().find(".dso-scroll-container").as("scrollable");

    cy.get("dso-modal").shadow().find(".dso-close").should("have.focus");
    cy.get("@modalBody").should("have.attr", "tabindex", 0);
    cy.get("@scrollable").invoke("scrollTop").should("eq", 0);

    cy.realPress("Tab");

    cy.get("@modalBody").should("have.focus");

    cy.realPress("{downarrow}");

    cy.get("@scrollable").invoke("scrollTop").should("be.greaterThan", 0);
  });

  it("should return focus to previous element", () => {
    cy.visit("http://localhost:45000/iframe.html?id=voorbeeldpagina-s-patronen-modal-return-focus--modal-return-focus");

    cy.contains("Open modal").as("activate-button").click().should("not.have.focus");

    cy.get("dso-modal").shadow().find("dialog").invoke("prop", "open").should("be.true");

    cy.realPress("Escape");

    cy.get("@activate-button").should("have.focus");
  });
});
