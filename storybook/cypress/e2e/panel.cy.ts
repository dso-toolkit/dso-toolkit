describe("Panel", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-panel--default");
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.checkA11y("dso-panel");
  });

  it("should matchImageSnapshot", () => {
    cy.get("dso-panel.hydrated").matchImageSnapshot();
  });

  it("should emit dsoCloseClick event when user clicks the panel close button", () => {
    cy.get("dso-panel")
      .then(($panel) => {
        $panel.on("dsoCloseClick", cy.stub().as("dsoCloseClickListener"));
      })
      .shadow()
      .find(".panel-close")
      .click()
      .get("@dsoCloseClickListener")
      .should("have.been.calledOnce");
  });
});
