describe("Highlight box", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=html-css-row-equal-heights--highlight-boxes");
  });

  it("Gives each box the same height", () => {
    cy.viewport(1320, 720);
    cy.get(".dso-equal-heights :first-child .dso-highlight-box").invoke("height").as("height_of_box");

    cy.get(".dso-equal-heights .dso-highlight-box").invoke("height").should("have.be", this.height_of_box);
  });

  it("Gives each box 100% width in mobile viewport", () => {
    cy.viewport(320, 720);
    cy.get(".dso-highlight-box").invoke("width").should("be.equal", 209);
  });
});
