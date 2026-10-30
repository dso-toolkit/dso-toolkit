describe("Card", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-card--with-selectable-and-button")
      .get("dso-card.hydrated")
      .then(($card) => {
        $card.on("dsoCardClick", cy.stub().as("dsoCardClickListener"));
      });
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.dsoCheckA11y("dso-card.hydrated");
  });

  it("should only call dsoCardClick event when user clicks a title in heading", () => {
    cy.get("dso-card.hydrated")
      .find("dso-selectable > .dso-selectable-container > .dso-selectable-input-wrapper > input")
      .focus()
      .realClick()
      .get("@dsoCardClickListener")
      .should("not.have.been.called")
      .get("dso-card.hydrated")
      .find(".dso-card-interaction")
      .first()
      .realClick()
      .get("@dsoCardClickListener")
      .should("not.have.been.called")
      .get("dso-card.hydrated")
      .shadow()
      .find(".dso-card-heading > a")
      .realClick()
      .get("@dsoCardClickListener")
      .should("have.been.calledOnce");
  });

  it("should not call dsoCardClick on click on info button with toggletip", () => {
    cy.get("dso-card.hydrated")
      .find("div[slot='interactions']")
      .then(($cardInteractions) => {
        $cardInteractions.append(
          '<div class="dso-card-interaction"><dso-info-button label="Toon informatie" toggletip-placement="left"' +
            ' class="hydrated"><div slot="toggletip">Extra informatie</div></dso-info-button></div>',
        );
      })
      .get("dso-card.hydrated")
      .find(".dso-card-interaction > dso-info-button")
      .click()
      .get("@dsoCardClickListener")
      .should("not.have.been.called");
  });

  it("creates anchor to external link when href is set and mode is set to 'extern'", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-card--default")
      .get("dso-card.hydrated")
      .invoke("prop", "mode", "extern")
      .shadow()
      .find("a.heading-anchor")
      .as("anchorHeadingSection")
      .should("have.attr", "href", "#")
      .and("have.attr", "target", "_blank")
      .and("have.attr", "rel", "noopener noreferrer")
      .find("dso-icon.hydrated")
      .shadow()
      .find("svg")
      .should("have.attr", "id", "external-link")
      .get("@anchorHeadingSection")
      .find("span.sr-only")
      .should("have.text", "(Opent andere website in nieuw tabblad)");
  });

  it("creates anchor to download link when href is set and mode is set to 'download'", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-card--default")
      .get("dso-card.hydrated")
      .invoke("prop", "mode", "download")
      .shadow()
      .find("a.heading-anchor")
      .should("have.attr", "href", "#")
      .get("dso-card.hydrated")
      .shadow()
      .find("dso-icon.hydrated")
      .should("have.prop", "icon", "download");
  });

  const longLabels = {
    "with spaces": "Omgevingsplan Nieuwegein ".repeat(12).trim(),
    "without spaces": "OmgevingsplanNieuwegein".repeat(8),
  };

  for (const [description, label] of Object.entries(longLabels)) {
    it(`should keep the icon attached to the last word of a long title (${description})`, () => {
      cy.viewport(600, 600)
        .visit(`http://localhost:45000/iframe.html?id=core-card--default&args=label:${encodeURIComponent(label)}`)
        .get("dso-card.hydrated [slot='heading']")
        .should("have.text", label)
        .then(($heading) => {
          const lineRects = $heading[0].getClientRects();
          const lastLine = lineRects[lineRects.length - 1];
          expect(lineRects.length, "heading wraps over multiple lines").to.be.greaterThan(1);

          cy.get("dso-card.hydrated")
            .shadow()
            .find("a.heading-anchor > dso-icon")
            .then(($icon) => {
              const icon = $icon[0].getBoundingClientRect();
              const iconCenter = icon.top + icon.height / 2;

              expect(iconCenter, "icon is on the last line").to.be.within(lastLine.top, lastLine.bottom);
              expect(icon.left - lastLine.right, "icon follows the last word").to.be.within(0, 16);
            });
        });
    });
  }

  it("should show different background-color when active='true'", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-card--default")
      .get("dso-card.hydrated")
      .invoke("prop", "active", true)
      .shadow()
      .find(".dso-card-container")
      .should("have.css", "background-color", "rgb(229, 229, 229)");

    cy.get("dso-card.hydrated").matchImageSnapshot();
  });
});
