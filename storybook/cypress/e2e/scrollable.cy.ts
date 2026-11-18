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
    const scrollEndEvents: string[] = [];

    cy.get<HTMLDsoScrollableElement>("dso-scrollable.hydrated")
      .then(([scrollable]) => {
        scrollable.addEventListener("dsoScrollEnd", (e) => scrollEndEvents.push(e.detail.scrollEnd));
      })
      .get("@scrollContainer")
      .scrollTo("bottom")
      .get("@scrollContainer")
      .should("have.class", "dso-scroll-bottom")
      .then(() => expect(scrollEndEvents).to.include("bottom"))
      .get("@scrollContainer")
      .scrollTo("top")
      .get("@scrollContainer")
      .should("have.class", "dso-scroll-top")
      .then(() => expect(scrollEndEvents).to.include("top"));
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
    cy.visit("http://localhost:45000/iframe.html?args=&id=core-scrollable--dynamic-content");

    cy.get("dso-scrollable").as("scrollable");
    cy.get("dso-accordion-section").as("section");

    cy.get("@section").should("have.class", "hydrated").and("have.class", "dso-accordion-compact");

    cy.get("@scrollable").shadow().find(".dso-scroll-container").as("container");

    cy.get("@container").then(($container) => {
      cy.viewport(1000, $container[0].scrollHeight + 50);
    });

    cy.get("@container").should("not.have.class", "dso-scroll-top");

    cy.get("@section").invoke("prop", "open", true);

    cy.get("@container").should(($el) => {
      const el = $el[0];
      expect(el.scrollHeight).to.be.greaterThan(el.clientHeight);
    });

    cy.get("@container").should("have.class", "dso-scroll-top");
  });
});
