describe("Highlight Box", () => {
  const stories = [
    "default",
    "green",
    "grey-with-border",
    "white-with-dropshadow",
    "with-image",
    "with-border",
    "with-icon",
    "yellow",
  ];

  for (const story of stories) {
    it(`should be accessible (${story})`, () => {
      cy.visit(`http://localhost:45000/iframe.html?id=core-highlight-box--${story}`);
      cy.injectAxe();
      cy.dsoCheckA11y("dso-highlight-box.hydrated");
    });

    it(`matches imageSnapshot (${story})`, () => {
      cy.visit(`http://localhost:45000/iframe.html?id=core-highlight-box--${story}`);
      cy.get("dso-highlight-box.hydrated").matchImageSnapshot(`${Cypress.currentTest.title} - ${story}`);
    });
  }

  it("uses the image slot for the With Image variant", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-highlight-box--with-image");

    cy.get("dso-highlight-box.hydrated")
      .find('img[slot="image"]')
      .should("be.visible")
      .should(($image) => {
        const image = $image[0];

        expect(image.assignedSlot?.name).to.equal("image");
        expect(getComputedStyle(image).objectFit).to.equal("cover");
      });
  });
});
