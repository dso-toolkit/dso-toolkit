describe("Banner", () => {
  it("should render error banner", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-banner--error")
      .get("dso-banner.hydrated")
      .should("have.attr", "status", "error")
      .matchImageSnapshot();
  });

  it("should render info banner", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-banner--info")
      .get("dso-banner.hydrated")
      .should("have.attr", "status", "info")
      .matchImageSnapshot();
  });

  it("should render compact non removable info banner", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-banner--info-compact-non-removable")
      .get("dso-banner.hydrated")
      .should("have.attr", "status", "info")
      .find("button.dso-tertiary")
      .should("not.exist");
    cy.matchImageSnapshot();
  });

  it("should render warning banner", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-banner--warning")
      .get("dso-banner.hydrated")
      .should("have.attr", "status", "warning")
      .matchImageSnapshot();
  });

  it("should render success banner", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-banner--success")
      .get("dso-banner.hydrated")
      .should("have.attr", "status", "success")
      .matchImageSnapshot();
  });
});
