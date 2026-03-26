describe("Badge", () => {
  const stories = ["attention", "error", "info", "outline", "plain", "primary", "success", "warning"];

  const visitStory = (story: string) => cy.visit(`http://localhost:45000/iframe.html?id=core-badge--${story}`);

  const getComponent = () => cy.get("dso-badge.hydrated").should("exist");

  const openAndAssert = () => {
    getComponent().shadow().find(".toggletip-button").realClick();
    getComponent()
      .shadow()
      .find(".dso-tooltip + .dso-tooltip")
      .should("have.css", "visibility", "visible")
      .should("have.css", "opacity", "1");

    cy.matchImageSnapshot(Cypress.currentTest.title);

    getComponent().shadow().find(".toggletip-button").realClick();
    getComponent()
      .shadow()
      .find(".dso-tooltip + .dso-tooltip")
      .should("have.css", "visibility", "hidden")
      .should("have.css", "opacity", "0");
  };

  // ---------- Variants ----------
  stories.forEach((story) => {
    it(`${story} should be accessible and match snapshot`, () => {
      visitStory(story);
      cy.injectAxe();
      cy.dsoCheckA11y("dso-badge.hydrated");
      getComponent().matchImageSnapshot(Cypress.currentTest.title);
    });
  });

  describe("WithToggletip toggletip", () => {
    beforeEach(() => {
      visitStory("with-toggletip");
      cy.viewport(1400, 720);
    });

    it("should show the tooltip on hover", () => {
      getComponent()
        .realHover()
        .shadow()
        .find(".toggletip-button + .dso-tooltip")
        .should("have.css", "visibility", "visible")
        .should("have.css", "opacity", "1");
    });

    const placements = [
      { label: "top (default)" },
      { label: "bottom", attr: "bottom" },
      { label: "left", attr: "left" },
      { label: "right", attr: "right" },
    ];

    placements.forEach(({ label, attr }) => {
      it(`should show the toggletip on ${label} on click`, () => {
        getComponent().invoke("attr", "toggletip-placement", attr);

        openAndAssert();
      });
    });
  });
});
