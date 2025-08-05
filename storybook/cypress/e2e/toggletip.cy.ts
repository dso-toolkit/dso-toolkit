describe("Toggletip", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-toggletip--toggletip");
  });

  const modes = ["toggle", "secondary", "badge", "icon"];

  for (const mode of modes) {
    describe(`mode ${mode}`, () => {
      beforeEach(() => {
        cy.visit(`http://localhost:45000/iframe.html?id=core-toggletip--toggletip&args=mode:${mode}`);
      });

      it("should be accessible", () => {
        cy.injectAxe();
        cy.dsoCheckA11y("dso-toggletip.hydrated");
      });

      it(`should show toggletip`, () => {
        cy.get("dso-toggletip.hydrated").should("be.visible").matchImageSnapshot();
      });
    });
  }

  const positions = ["top", "right", "bottom", "left"];

  for (const position of positions) {
    it(`should show tooltip at ${position} position`, () => {
      cy.viewport(750, 500).visit(
        `http://localhost:45000/iframe.html?id=core-toggletip--toggletip&args=position:${position}`,
      );

      cy.get("dso-toggletip.hydrated")
        .should("be.visible")
        .shadow()
        .find("dso-info-button")
        .shadow()
        .find("button")
        .click();

      // Even wachten tot de verschijntransistie van 150ms van het functional component tooltip gereed is
      cy.wait(200).matchImageSnapshot();
    });
  }
});
