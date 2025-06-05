describe("Onboarding Tip", () => {
  beforeEach(() => {
    cy.viewport(1200, 800).visit("http://localhost:45000/iframe.html?id=core-onboarding-tip--default");
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.dsoCheckA11y("dso-onboarding-tip.hydrated");
  });

  it("should render onboarding tip", () => {
    cy.get("dso-onboarding-tip").should("have.attr", "ready");

    cy.matchImageSnapshot({ capture: "viewport" });
  });

  it("should hide onboarding tip when its outside the viewport", () => {
    cy.scrollTo(0, 1000).get("dso-onboarding-tip").should("not.be.visible");

    cy.matchImageSnapshot({ capture: "viewport" });
  });

  it("should place onboarding tip to the left", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-onboarding-tip--default&args=box:5;placement:left");

    cy.matchImageSnapshot({ capture: "viewport" });
  });

  it("should place onboarding tip to the right", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-onboarding-tip--default&args=box:5;placement:right");

    cy.matchImageSnapshot({ capture: "viewport" });
  });

  it("should place onboarding tip to the top", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-onboarding-tip--default&args=box:5;placement:top");

    cy.matchImageSnapshot({ capture: "viewport" });
  });

  it("should place onboarding tip to the bottom", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-onboarding-tip--default&args=box:5;placement:bottom");

    cy.scrollTo(0, 200);

    cy.matchImageSnapshot({ capture: "viewport" });
  });
});
