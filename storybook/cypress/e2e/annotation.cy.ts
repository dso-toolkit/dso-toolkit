describe("Annotation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-annotation--default");
    cy.injectAxe();
    cy.get("dso-annotation-output").then(($annotationOutput) => {
      $annotationOutput.on("dsoToggle", cy.stub().as("dsoToggleListener"));
    });
  });

  it("should be accessible", () => {
    cy.checkA11y("#root-inner");
    cy.get("dso-annotation-output dso-responsive-element > dso-expandable")
      .should("have.attr", "id", "annotation-test")
      .get("dso-annotation-button > button")
      .should("have.attr", "aria-controls", "annotation-test")
      .and("have.attr", "aria-expanded", "false")
      .click()
      .get("dso-annotation-button > button")
      .should("have.attr", "aria-expanded", "true");
  });

  it("should open and close annotation output on annotation button click", () => {
    cy.get("dso-annotation-output")
      .should("not.be.visible")
      .get("dso-annotation-button > button")
      .click()
      .get("@dsoToggleListener")
      .should("have.been.calledOnce")
      .get("dso-annotation-output")
      .should("be.visible")
      .percySnapshot()
      .get("dso-annotation-button > button")
      .click()
      .get("@dsoToggleListener")
      .should("have.been.calledTwice")
      .get("dso-annotation-output")
      .should("not.be.visible");
  });

  it("should close annotation output on close button click", () => {
    cy.get("dso-annotation-button > button")
      .click()
      .get("dso-annotation-output")
      .should("be.visible")
      .get("dso-annotation-output")
      .find(".dso-annotation-header > button.dso-annotation-close-button")
      .click()
      .get("@dsoToggleListener")
      .should("have.been.calledTwice")
      .get("dso-annotation-output")
      .should("not.be.visible");
  });
});
