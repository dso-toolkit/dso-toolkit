describe("Scroll container", () => {
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
});
