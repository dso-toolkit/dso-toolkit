describe("Card", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-card--with-selectable-and-button")
      .get("dso-card")
      .then(($card) => {
        $card.on("dsoCardClick", cy.stub().as("dsoCardClickListener"));
      });
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.dsoCheckA11y("dso-card.hydrated");
  });

  it("should only call dsoCardClick event when user clicks a title in heading", () => {
    cy.get("dso-card")
      .find("dso-selectable > .dso-selectable-container > .dso-selectable-input-wrapper > input")
      .focus()
      .realClick()
      .get("@dsoCardClickListener")
      .should("not.have.been.called")
      .get("dso-card")
      .find(".dso-card-interaction")
      .first()
      .realClick()
      .get("@dsoCardClickListener")
      .should("not.have.been.called")
      .get("dso-card")
      .shadow()
      .find(".dso-card-heading > a")
      .realClick()
      .get("@dsoCardClickListener")
      .should("have.been.calledOnce");
  });

  it("should not call dsoCardClick on toggletip", () => {
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
      .get("@dsoCardClickListener")
      .should("not.have.been.called");
  });

  it("creates anchor to external link when href is set and mode is set to 'extern'", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-card--default")
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
    cy.visit("http://localhost:45000/iframe.html?id=core-card--default")
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
