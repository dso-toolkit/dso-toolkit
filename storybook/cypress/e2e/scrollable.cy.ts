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
    const scrollContainer = () => cy.get("dso-scrollable.hydrated").shadow().find(".dso-scroll-container");

    scrollContainer()
      .should("not.have.class", "dso-scroll-top")
      .and("not.have.class", "dso-scroll-middle")
      .and("not.have.class", "dso-scroll-bottom");

    cy.get<HTMLDsoAccordionSectionElement>("dso-scrollable.hydrated > dso-accordion > dso-accordion-section").then(
      ([section]) =>
        new Cypress.Promise<void>((resolve) => {
          section.addEventListener("dsoAnimationEnd", () => resolve(), { once: true });
          section.open = true;
        }),
    );

    scrollContainer().should("have.class", "dso-scroll-top");
  });
});
