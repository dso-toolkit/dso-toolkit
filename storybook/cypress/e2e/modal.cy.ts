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
    cy.get("dso-modal")
      .find("div[slot='footer'] .dso-primary")
      .should("have.focus")
      .get("dso-modal")
      .realPress("Tab")
      .get("@dsoModal")
      .find(".dso-close")
      .should("have.focus")
      .realPress("Tab")
      .get("dso-modal")
      .find('div[slot="body"] > p > a')
      .should("have.focus")
      .realPress("Tab")
      .get("dso-modal")
      .find("button.dso-secondary")
      .should("have.focus")
      .realPress("Tab")
      .get("dso-modal")
      .find("button.dso-primary")
      .should("have.focus");

    cy.visit("http://localhost:45000/iframe.html?id=core-modal--confirm&args=initialFocus:a")
      .get("dso-modal")
      .find("a")
      .should("have.focus");

    cy.visit("http://localhost:45000/iframe.html?id=core-modal--passive")
      .get("dso-modal")
      .shadow()
      .find(".dso-close")
      .should("have.focus");

    cy.visit("http://localhost:45000/iframe.html?id=core-modal--confirm&args=initialFocus:img", {
      onBeforeLoad(win) {
        cy.stub(win.console, "warn").as("consoleWarn");
      },
    })
      .get("dso-modal")
      .find("div[slot='footer'] .dso-primary")
      .should("have.focus")
      .get("@consoleWarn")
      .should("be.calledWith", "element 'img' could not be found");
  });

  it("should emit dsoClose event when user closes modal", () => {
    cy.get("@dsoModal").find(".dso-close").click().get("@dsoCloseListener").should("have.been.calledOnce");
  });

  it("should emit dsoClose event on outside click", () => {
    cy.get("dso-modal")
      .find("div[slot='footer'] .dso-primary")
      .should("have.focus")
      .get("body")
      .realClick({ y: 50, x: 50 })
      .get("@dsoCloseListener")
      .should("have.been.calledOnce");
  });

  it("should emit dsoClose event on escape press", () => {
    cy.get("dso-modal")
      .find("div[slot='footer'] .dso-primary")
      .should("have.focus")
      .realPress("Escape")
      .get("@dsoCloseListener")
      .should("have.been.calledOnce");
  });
});
