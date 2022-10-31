describe("Tooltip", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-tooltip--as-child");
  });

  function prepareComponent() {
    cy.get("#root").invoke("attr", "style", "min-height: 360px;");

    cy.get("dso-tooltip").closest("button").as("dsoButton");
  }

  // https://github.com/dmtrKovalenko/cypress-real-events/issues/247
  // realHover has issues since chrome 100.

  // it('should show tooltip on hover on button and hide on escape key', () => {
  //   prepareComponent();

  //   cy
  //     .get('@dsoButton')
  //     .realHover();
  // });

  it.skip("should show tooltip on focus on button and hide on escape key", () => {
    prepareComponent();

    cy.get("@dsoButton")
      .wait(100)
      .focus()
      .wait(100)
      .find("dso-tooltip")
      .should("not.have.class", "hidden")
      .wait(250)
      .realPress("Escape")
      .wait(100)
      .get("@dsoButton")
      .find("dso-tooltip")
      .should("have.class", "hidden");
  });
});
