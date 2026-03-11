describe("History Item", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-history-item--in-werking");
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.dsoCheckA11y("dso-history-item.hydrated");
  });

  it("matches snapshot", () => {
    cy.get("dso-history-item.hydrated").matchImageSnapshot();
  });

  it("emits dsoClick event when user clicks the title of a History Item", () => {
    cy.get("dso-history-item.hydrated")
      .then(($historyItem) => {
        $historyItem.on("dsoClick", cy.stub().as("dsoClickListener"));
      })
      .shadow()
      .find(".title-anchor")
      .realClick()
      .get("@dsoClickListener")
      .should("be.calledOnce")
      .invoke("getCalls")
      .invoke("at", -1)
      .its("args.0.detail.originalEvent")
      .should("exist");
  });

  it("renders current state correctly", () => {
    cy.get("dso-history-item").then(($el) => {
      $el[0].current = true;
    });
    cy.get("dso-history-item")
      .shadow()
      .within(() => {
        cy.get(".title-anchor.current").should("exist");
        cy.get(".current dso-icon").should("exist");
      });
  });
});
