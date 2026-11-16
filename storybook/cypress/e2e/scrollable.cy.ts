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

    const getScrollContainer = () => cy.get("dso-scrollable").shadow().find(".dso-scroll-container");
    const getSection = () => cy.get("dso-accordion-section");

    getSection().should("have.class", "hydrated").and("have.class", "dso-accordion-compact");

    getScrollContainer().then(($container) => {
      const contentHeight = $container[0].scrollHeight;
      cy.viewport(1000, contentHeight + 50);
    });

    getScrollContainer().should("not.have.class", "dso-scroll-top");

    getSection().invoke("prop", "open", true);

    getScrollContainer().should(($el) => {
      const el = $el[0];
      expect(el.scrollHeight).to.be.greaterThan(el.clientHeight);
    });

    getScrollContainer().should("have.class", "dso-scroll-top");
  });
});
