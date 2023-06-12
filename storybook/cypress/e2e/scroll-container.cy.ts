describe("Scroll Container", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?args=&id=core-scroll-container--default")
      .get("dso-scroll-container")
      .then(($scrollContainer) => {
        $scrollContainer.on("dsoScrollContainerEvent", cy.stub().as("dsoScrollContainerEventListener"));
      })
      .shadow()
      .find(".scroll-container")
      .as("scrollContainer");
  });

  it("should scroll", () => {
    cy.percySnapshot();

    cy.get("@scrollContainer")
      .should("have.class", "scroll-top")
      .scrollTo(0, 500)
      .get("@scrollContainer")
      .should("have.class", "scroll-middle")
      .scrollTo("bottom")
      .get("@scrollContainer")
      .should("have.class", "scroll-bottom");
  });

  it("should emit event when scroll has reached top or bottom", () => {
    cy.get("@dsoScrollContainerEventListener")
      .should("have.been.calledOnce")
      .get("@scrollContainer")
      .scrollTo("bottom")
      .get("@dsoScrollContainerEventListener")
      .should("have.been.calledTwice");
  });

  it("should update scroll state on resize", () => {
    cy.get("@scrollContainer")
      .should("have.class", "scroll-top")
      .get("#scroll-container-mock")
      .then(($mock) => $mock.css("max-width", 900))
      .get("@scrollContainer")
      .should("not.have.class", "scroll-top");
  });

  it("should update scroll state with dynamic content", () => {
    cy.visit("http://localhost:45000/iframe.html?args=&id=core-scroll-container--dynamic-content")
      .get("dso-scroll-container")
      .shadow()
      .find(".scroll-container")
      .as("scrollContainer")
      .should("not.have.class", "scroll-top")
      .and("not.have.class", "scroll-middle")
      .and("not.have.class", "scroll-bottom")
      .get("dso-scroll-container")
      .find("> dso-accordion > dso-accordion-section[handle-title='Klap Open']")
      .click()
      .get("@scrollContainer")
      .should("have.class", "scroll-top");
  });
});
