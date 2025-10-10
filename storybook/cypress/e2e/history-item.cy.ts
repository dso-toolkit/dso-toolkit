describe("History Item", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-history-item--default");
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
});
