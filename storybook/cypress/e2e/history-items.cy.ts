describe("History Items", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-history-items--default");
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.dsoCheckA11y("dso-history-items.hydrated");
  });

  it("matches snapshots", () => {
    cy.get("dso-history-items.hydrated").matchImageSnapshot(
      `${Cypress.currentTest.title} - History Items - In Werking`,
    );

    cy.visit("http://localhost:45000/iframe.html?id=core-history-items--default&args=listPattern:ontwerp");

    cy.get("dso-history-items.hydrated").matchImageSnapshot(`${Cypress.currentTest.title} - History Items - Ontwerp`);
  });

  it("emits dsoHistoryItemClick event when user clicks the title of a History Item", () => {
    cy.get("dso-history-items.hydrated")
      .find("dso-history-item:nth-of-type(1)")
      .as("historyItem")
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
