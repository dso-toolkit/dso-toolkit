describe.skip("Card", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-card--default")
      .get("dso-card")
      .then(($card) => {
        $card.on("dsoCardClicked", cy.stub().as("dsoCardClickedListener"));
      })
      .shadow()
      .as("dsoCard");
  });

  it("should call dsoCardClicked event when user clicks a non-interactive element in card", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-card--selectable")
      .get("dso-card")
      .find("dso-selectable > input")
      .focus()
      .click()
      .get("@dsoCardClickedListener")
      .should("not.have.been.called")
      .get("dso-card")
      .find(".dso-card-interaction")
      .first()
      .click()
      .get("@dsoCardClickedListener")
      .should("not.have.been.called")
      .get("dso-card")
      .click()
      .get("@dsoCardClickedListener")
      .should("have.been.calledOnce");
  });
});
