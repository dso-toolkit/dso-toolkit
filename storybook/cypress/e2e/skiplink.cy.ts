describe("Skiplink", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-skiplink--default")
      .get("dso-skiplink")
      .then(($skiplink) => {
        $skiplink.on("dsoSkiplinkClick", cy.stub().as("dsoSkiplinkClickListener"));
      });
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.dsoCheckA11y("dso-skiplink.hydrated");
  });

  it("should only be visible when tabbed upon", () => {
    cy.get("dso-skiplink.hydrated").shadow().find("a").should("not.be.visible");

    cy.get("dso-skiplink.hydrated").shadow().find("a").focus();

    cy.get("dso-skiplink.hydrated").shadow().find("a").should("be.visible");

    cy.matchImageSnapshot();
  });

  it("should call event on mouse click", () => {
    cy.get("dso-skiplink.hydrated").shadow().find("a").focus();

    cy.get("dso-skiplink.hydrated").shadow().find("a").click().get("@dsoSkiplinkClickListener").should("be.calledOnce");
  });
});
