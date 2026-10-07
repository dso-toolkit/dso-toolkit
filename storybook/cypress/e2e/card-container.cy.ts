describe("Card Container", () => {
  beforeEach(() => {
    cy.viewport(1280, 600);
  });

  const stories = ["card-grid", "card-list"];

  for (const story of stories) {
    it(`should be accessible (${story})`, () => {
      cy.visit(`http://localhost:45000/iframe.html?id=core-card-container--${story}`);
      cy.injectAxe();
      cy.dsoCheckA11y("dso-card-container.hydrated");
    });

    it(`matches imageSnapshot (${story})`, () => {
      cy.visit(`http://localhost:45000/iframe.html?id=core-card-container--${story}`);
      cy.get("dso-card-container.hydrated").matchImageSnapshot(`${Cypress.currentTest.title} - ${story}`);
    });
  }

  ["compact", "compact-black"].forEach((variant) => {
    it(`hides the bottom border of the list only when it is the last element in a ${variant} Accordion Section`, () => {
      cy.visit("http://localhost:45000/iframe.html?id=core-card-container--card-list");

      cy.get("dso-card-container.hydrated")
        .as("cardContainer")
        .shadow()
        .find(".dso-card-list")
        .should("have.css", "border-bottom-style", "solid");

      cy.get("@cardContainer").then(($cardContainer) =>
        $cardContainer.wrap(
          `<dso-accordion variant="${variant}"><dso-accordion-section handle-title="Kaarten" heading="h2" open></dso-accordion-section></dso-accordion>`,
        ),
      );

      cy.get("dso-accordion-section.hydrated").should("have.class", `dso-accordion-${variant}`);

      cy.get("@cardContainer").shadow().find(".dso-card-list").should("have.css", "border-bottom-style", "none");

      cy.get("dso-accordion-section.hydrated").then(($section) => {
        const list = $section.find("dso-card-container")[0].shadowRoot?.querySelector(".dso-card-list");

        if (!list) {
          throw new Error(".dso-card-list not found");
        }

        const sectionBorder = parseFloat(getComputedStyle($section[0]).borderBottomWidth);
        const gap = $section[0].getBoundingClientRect().bottom - sectionBorder - list.getBoundingClientRect().bottom;

        expect(gap, "gap below the list as last element").to.be.closeTo(0, 0.5);
      });

      cy.get("dso-accordion-section.hydrated").then(($section) =>
        $section.append('<div class="dso-rich-content"><p>Tekst na de lijst</p></div>'),
      );

      cy.get("@cardContainer").shadow().find(".dso-card-list").should("have.css", "border-bottom-style", "solid");
    });
  });
});
