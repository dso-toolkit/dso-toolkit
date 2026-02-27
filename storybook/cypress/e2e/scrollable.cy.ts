describe("Scrollable", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?args=&id=core-scrollable--default")
      .get("dso-scrollable.hydrated")
      .shadow()
      .find(".dso-scroll-container")
      .as("scrollContainer");
  });

  it("matches image snapshot", () => {
    cy.get("@scrollContainer")
      .should("have.class", "dso-scroll-top")
      .get("dso-scrollable.hydrated")
      .matchImageSnapshot();
  });

  it("should scroll", () => {
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
    const events: string[] = [];

    cy.get("dso-scrollable.hydrated")
      .then(($scrollable) => {
        $scrollable.on("dsoScrollEnd", (e: CustomEvent) => events.push(e.detail.scrollEnd));
      })
      .get("@scrollContainer")
      .scrollTo("bottom")
      .get("@scrollContainer")
      .should("have.class", "dso-scroll-bottom")
      .then(() => expect(events).to.include("bottom"))
      .get("@scrollContainer")
      .scrollTo("top")
      .get("@scrollContainer")
      .should("have.class", "dso-scroll-top")
      .then(() => expect(events).to.include("top"));
  });

  it("should update scroll state on resize", () => {
    cy.get("@scrollContainer")
      .should("have.class", "dso-scroll-top")
      .get("#scrollable-mock")
      .then(($mock) => $mock.css("max-width", 1000))
      .get("@scrollContainer")
      .should("not.have.class", "dso-scroll-top");
  });

  it("should update scroll state with dynamic content", () => {
    cy.visit("http://localhost:45000/iframe.html?args=&id=core-scrollable--dynamic-content")
      .get("dso-scrollable.hydrated")
      .get("@scrollContainer")
      .should("not.have.class", "dso-scroll-top")
      .and("not.have.class", "dso-scroll-middle")
      .and("not.have.class", "dso-scroll-bottom")
      .get("dso-scrollable.hydrated")
      .find("> dso-accordion > dso-accordion-section")
      .invoke("attr", "open", true)
      .get("dso-scrollable.hydrated")
      .get("@scrollContainer")
      .should("have.class", "dso-scroll-top");
  });
});
