describe("Card", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-card--href-and-selectable-with-button")
      .get("dso-card")
      .then(($card) => {
        $card.on("dsoCardClicked", cy.stub().as("dsoCardClickedListener"));
      });
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.dsoCheckA11y("dso-card.hydrated");
  });

  it("should call dsoCardClicked event when user clicks a non-interactive element in card", () => {
    cy.get("dso-card")
      .find("dso-selectable > .dso-selectable-container > .dso-selectable-input-wrapper > input")
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
          '<div class="dso-card-interaction"><dso-toggletip label="Toon informatie" position="left" class="hydrated">Extra informatie</dso-toggletip></div>',
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

  it("creates anchor to external link when href is set and mode is set to 'extern'", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-card--href")
      .get("dso-card")
      .invoke("prop", "mode", "extern")
      .shadow()
      .find("a.heading-anchor")
      .as("anchorHeadingSection")
      .should("have.attr", "href", "#")
      .and("have.attr", "target", "_blank")
      .and("have.attr", "rel", "noopener noreferrer")
      .find("dso-icon")
      .shadow()
      .find("svg")
      .should("have.attr", "id", "external-link")
      .get("@anchorHeadingSection")
      .find("span.sr-only")
      .should("have.text", "(Opent andere website in nieuw tabblad)");
  });

  it("creates anchor to download link when href is set and mode is set to 'download'", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-card--href")
      .get("dso-card")
      .invoke("prop", "mode", "download")
      .shadow()
      .find("a.heading-anchor")
      .should("have.attr", "href", "#")
      .find("dso-icon")
      .shadow()
      .find("svg")
      .should("have.attr", "id", "download");
  });
});
