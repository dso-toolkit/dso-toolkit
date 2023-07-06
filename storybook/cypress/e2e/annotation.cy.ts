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
    cy.get("dso-annotation-button, dso-annotation-output")
      .should("have.attr", "open")
      .get("dso-annotation-output dso-expandable")
      .should("have.attr", "id", "annotation-test")
      .get("dso-annotation-button > button")
      .should("have.attr", "aria-controls", "annotation-test")
      .and("have.attr", "aria-expanded", "true")
      .get("dso-annotation-button, dso-annotation-output")
      .invoke("attr", "open", null)
      .get("dso-annotation-button > button")
      .should("have.attr", "aria-expanded", "false");
  });

  it("should emit events", () => {
    cy.get("dso-annotation-button, dso-annotation-output")
      .should("have.attr", "open")
      .get("dso-annotation-button")
      .then(($dsoAnnotationButton) => $dsoAnnotationButton.on("dsoClick", cy.stub().as("dsoClick")))
      .get("dso-annotation-output")
      .then(($dsoAnnotationOutput) => $dsoAnnotationOutput.on("dsoClose", cy.stub().as("dsoClose")))
      .get("dso-annotation-button > button")
      .click()
      .get("@dsoClick")
      .should("be.calledOnce")
      .invoke("getCalls")
      .invoke("at", -1)
      .its("args.0.detail")
      .as("detail")
      .its("open")
      .should("eq", false)
      .get("@detail")
      .its("originalEvent")
      .should("exist")
      .get("dso-annotation-output .dso-annotation-close-button")
      .click()
      .get("@dsoClose")
      .should("be.calledOnce")
      .invoke("getCalls")
      .invoke("at", -1)
      .its("args.0.detail")
      .its("originalEvent")
      .should("exist");
  });
});
