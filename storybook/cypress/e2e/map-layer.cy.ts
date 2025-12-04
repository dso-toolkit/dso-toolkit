describe("Map Layer", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-map-layer--multiple");
    cy.get("dso-map-layer.hydrated")
      .as("dsoMapLayer")
      .shadow()
      .as("dsoMapLayerShadow")
      .get("dso-map-layer-object.hydrated")
      .first()
      .as("dsoMapLayerObject")
      .get("dso-map-layer-object.hydrated")
      .eq(1)
      .as("dsoMapLayerObjectSecond");
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.dsoCheckA11y("dso-map-layer.hydrated");
  });

  it("screenshot", () => {
    cy.get("@dsoMapLayer").matchImageSnapshot(`${Cypress.currentTest.title}`);
  });

  it("shows a Slide Toggle depending upon value of prop `activatable`", () => {
    cy.get("@dsoMapLayer")
      .invoke("prop", "activatable", false)
      .shadow()
      .find(".slide-toggle-container dso-slide-toggle")
      .should("not.exist");

    cy.get("@dsoMapLayer")
      .invoke("prop", "activatable", true)
      .shadow()
      .find(".slide-toggle-container dso-slide-toggle")
      .should("exist");
  });

  it("should emit ActiveChange event", () => {
    cy.get("@dsoMapLayer")
      .then(($element) => $element.on("dsoActiveChange", cy.stub().as("activeChangeListener")))
      .get("@dsoMapLayerShadow")
      .find(".slide-toggle-container dso-slide-toggle")
      .click()
      .get("@activeChangeListener")
      .should("have.been.calledOnce");
  });

  describe("Map Layer Object", () => {
    it("emits ActiveChange event", () => {
      cy.get("@dsoMapLayerObject")
        .then(($element) => $element.on("dsoActiveChange", cy.stub().as("activeChangeListener")))
        .shadow()
        .find(".slide-toggle-container dso-slide-toggle")
        .click()
        .get("@activeChangeListener")
        .should("have.been.calledOnce");
    });

    it("emits dsoMouseEnter and dsoMouseLeave events", () => {
      cy.get("@dsoMapLayerObject")
        .then(($element) => $element.on("dsoMouseEnter", cy.stub().as("mouseEnterListener")))
        .realHover()
        .get("@mouseEnterListener")
        .should("have.been.calledOnce");

      cy.get("@dsoMapLayerObject")
        .then(($element) => $element.on("dsoMouseLeave", cy.stub().as("mouseLeaveListener")))
        .realHover()
        .get("@dsoMapLayerObjectSecond")
        .realHover()
        .get("@mouseLeaveListener")
        .should("have.been.calledOnce");
    });
  });
});
