describe("Scrollable", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?args=&id=core-scrollable--default")
      .get("dso-scrollable")
      .then(($scrollable) => {
        $scrollable.on("dsoScrollEnd", cy.stub().as("dsoScrollEndListener"));
      })
      .shadow()
      .find(".dso-scroll-container")
      .as("scrollContainer");
  });

  it("should scroll", () => {
    // cy.percySnapshot();

    cy.get("@scrollContainer")
      .should("have.class", "dso-scroll-top")
      .scrollTo(0, 500)
      .get("@scrollContainer")
      .should("have.class", "dso-scroll-middle")
      .scrollTo("bottom")
      .get("@scrollContainer")
      .should("have.class", "dso-scroll-bottom");
  });

  it("should emit event when scroll has reached top or bottom", () => {
    cy.get("@dsoScrollEndListener")
      .should("not.have.been.called")
      .get("@scrollContainer")
      .scrollTo("bottom")
      .get("@dsoScrollEndListener")
      .should("have.been.calledOnce")
      .get("@scrollContainer")
      .scrollTo("top")
      .get("@dsoScrollEndListener")
      .should("have.been.called.be.calledTwice");
  });

  it("should update scroll state on resize", () => {
    cy.get("@scrollContainer")
      .should("have.class", "dso-scroll-top")
      .get("#scrollable-mock")
      .then(($mock) => $mock.css("max-width", 900))
      .get("@scrollContainer")
      .should("not.have.class", "dso-scroll-top");
  });

  it("should update scroll state with dynamic content", () => {
    cy.visit("http://localhost:45000/iframe.html?args=&id=core-scrollable--dynamic-content")
      .get("dso-scrollable")
      .shadow()
      .find(".dso-scroll-container")
      .as("scrollContainer")
      .should("not.have.class", "dso-scroll-top")
      .and("not.have.class", "dso-scroll-middle")
      .and("not.have.class", "dso-scroll-bottom")
      .get("dso-scrollable")
      .find("> dso-accordion > dso-accordion-section[handle-title='Klap Open']")
      .invoke("attr", "open", true)
      .get("@scrollContainer")
      .should("have.class", "dso-scroll-top");
  });
});
