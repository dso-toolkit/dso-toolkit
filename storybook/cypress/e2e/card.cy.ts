describe("Card", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-card--selectable")
      .get("dso-card")
      .then(($card) => {
        $card.on("dsoCardClicked", cy.stub().as("dsoCardClickedListener"));
      });
  });

  it("should call dsoCardClicked event when user clicks a non-interactive element in card", () => {
    cy.get("dso-card")
      .find("dso-selectable > .dso-selectable-input-wrapper > input")
      .focus()
      .realClick()
      .get("@dsoCardClickedListener")
      .should("not.have.been.called")
      .get("dso-card")
      .find(".dso-card-interaction")
      .first()
      .realClick()
      .get("@dsoCardClickedListener")
      .should("not.have.been.called")
      .get("dso-card")
      .realClick()
      .get("@dsoCardClickedListener")
      .should("have.been.calledOnce");
  });

  it("should not call dsoCardClicked on toggletip", () => {
    cy.get("dso-card")
      .find("div[slot='interactions']")
      .then(($cardInteractions) => {
        $cardInteractions.append(
          '<div class="dso-card-interaction"><dso-toggletip label="Toon informatie" position="left" class="hydrated">Extra informatie</dso-toggletip></div>'
        );
      })
      .get("dso-card")
      .find(".dso-card-interaction > dso-toggletip")
      .click()
      .get("@dsoCardClickedListener")
      .should("not.have.been.called");
  });

  it("should set isModifiedEvent when the card event is triggered with modifiers (eg. holding CTRL or right-click)", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-card--selectable");
  });
});
