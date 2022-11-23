describe.skip("Card", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-card--default")
      .get("dso-card")
      .then(($card) => {
        console.log("test", $card[0], $card[0] !== undefined);
        $card.on("dsoCardClicked", cy.stub().as("dsoCardClickedListener"));
        $card[0].addEventListener("dsoCardClicked", (e) => {
          console.log(e);
        });
      });
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
      .realClick()
      .get("@dsoCardClickedListener")
      .should("have.been.calledOnce");
  });

  it("should set isModifiedEvent when the card event is triggered with modifiers (eg. holding CTRL or right-click)", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-card--selectable");
  });
});
