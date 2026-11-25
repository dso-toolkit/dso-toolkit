describe("Skiplink", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-skiplink--default")
      .url()
      .should("include", "viewMode=story")
      .get("dso-skiplink.hydrated")
      .then(($skiplink) => {
        $skiplink.on("dsoSkiplinkClick", cy.stub().as("dsoSkiplinkClickListener"));
      });

    cy.get("dso-skiplink.hydrated").shadow().find("a").as("link");
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.dsoCheckA11y("dso-skiplink.hydrated");
  });

  it("should only be visible when tabbed upon", () => {
    cy.get("@link")
      .should(($a) => {
        expect($a[0].matches(":focus-visible")).to.equal(false);
      })
      .and("have.css", "clip-path", "inset(1px)")
      .and("have.css", "width", "1px")
      .and("have.css", "height", "1px");

    cy.window().focus();
    cy.realPress("Tab");

    cy.get("@link")
      .should(($a) => {
        expect($a[0].matches(":focus-visible")).to.equal(true);
        expect($a[0].getBoundingClientRect().width).to.be.greaterThan(1);
      })
      .and("have.css", "clip-path", "none")
      .and("be.visible");

    cy.matchImageSnapshot();
  });

  it("should call event on mouse click", () => {
    cy.get("@link").focus().click();

    cy.get("@dsoSkiplinkClickListener").should("be.calledOnce");
  });
});
