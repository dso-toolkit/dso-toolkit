describe("History Items", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-history-item--default");
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.dsoCheckA11y("dso-history-item.hydrated");
  });

  it("matches snapshots", () => {
    cy.get("dso-history-item.hydrated").matchImageSnapshot();
  });

  it("emits dsoHistoryItemClick event when user clicks the title of a History Item", () => {
    cy.get("dso-history-item.hydrated")
      .then(($historyItem) => {
        $historyItem.on("dsoHistoryItemClick", cy.stub().as("dsoHistoryItemClickListener"));
      })
      .shadow()
      .find(".title-anchor")
      .realClick()
      .get("@dsoHistoryItemClickListener")
      .should("be.calledOnce")
      .invoke("getCalls")
      .invoke("at", -1)
      .its("args.0.detail.originalEvent")
      .should("exist");
  });
});
