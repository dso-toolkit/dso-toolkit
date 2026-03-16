describe("Badge", () => {
  const stories = ["attention", "error", "info", "outline", "plain", "primary", "success", "warning"];

  const visitStory = (story: string) => cy.visit(`http://localhost:45000/iframe.html?id=core-badge--${story}`);

  const getComponent = () => cy.get("dso-badge.hydrated").should("exist");

  const openAndAssert = () => {
    getComponent().realClick().shadow().find(".dso-tooltip + .dso-tooltip").should("have.class", "visible");

    cy.matchImageSnapshot(Cypress.currentTest.title);

    getComponent().realClick().shadow().find(".dso-tooltip + .dso-tooltip").should("not.have.class", "visible");
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

  describe("information toggletip", () => {
    beforeEach(() => {
      visitStory("information");
      cy.viewport(1400, 720);
    });

    it("should show the tooltip on hover", () => {
      getComponent().realHover().shadow().find(".toggletip-button + .dso-tooltip").should("have.class", "visible");
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
