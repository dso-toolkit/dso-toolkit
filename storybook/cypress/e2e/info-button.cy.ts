describe("Info Button", () => {
  const variants = ["default", "information", "secondary-inactive", "secondary-active"];

  const visitStory = (story: string) => cy.visit(`http://localhost:45000/iframe.html?id=core-info-button--${story}`);

  const getComponent = () => cy.get("dso-info-button.hydrated");

  const openAndAssert = () => {
    getComponent().realClick().shadow().find("> .dso-tooltip").should("have.class", "visible");

    cy.matchImageSnapshot(Cypress.currentTest.title);

    getComponent().realClick().shadow().find("> .dso-tooltip").should("not.have.class", "visible");
  };

  // ---------- Variants ----------
  variants.forEach((variant) => {
    it(`${variant} should be accessible and match snapshot`, () => {
      visitStory(variant);
      cy.injectAxe();
      cy.dsoCheckA11y("dso-info-button.hydrated");
      getComponent().matchImageSnapshot(Cypress.currentTest.title);
    });
  });

  describe("information toggletip", () => {
    beforeEach(() => {
      visitStory("information");
      cy.viewport(1400, 720);
    });

    it("should show the tooltip on hover", () => {
      getComponent().realHover().shadow().find("dso-icon-button").shadow().find(".dso-tooltip").should("be.visible");
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
