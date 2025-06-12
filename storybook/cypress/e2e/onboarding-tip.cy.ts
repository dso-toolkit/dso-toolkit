describe("Onboarding Tip", () => {
  beforeEach(() => {
    cy.viewport(1200, 800).visit("http://localhost:45000/iframe.html?id=core-onboarding-tip--default");
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.dsoCheckA11y("dso-onboarding-tip.hydrated");
  });

  it("should render onboarding tip", () => {
    cy.get("dso-onboarding-tip.hydrated").should("have.attr", "ready");

    cy.matchImageSnapshot({ capture: "viewport" });
  });

  it("should hide onboarding tip when it is outside the viewport", () => {
    cy.scrollTo(0, 1000).get("dso-onboarding-tip.hydrated").should("not.be.visible");

    cy.matchImageSnapshot({ capture: "viewport" });
  });

  it("should place onboarding tip to the left", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-onboarding-tip--default&args=box:5;placement:left");

    cy.get("dso-onboarding-tip.hydrated").should("be.visible");

    cy.matchImageSnapshot({ capture: "viewport" });
  });

  it("should place onboarding tip to the right", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-onboarding-tip--default&args=box:5;placement:right");

    cy.get("dso-onboarding-tip.hydrated").should("be.visible");

    cy.matchImageSnapshot({ capture: "viewport" });
  });

  it("should place onboarding tip to the top", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-onboarding-tip--default&args=box:5;placement:top");

    cy.get("dso-onboarding-tip.hydrated").should("be.visible");

    cy.matchImageSnapshot({ capture: "viewport" });
  });

  it("should place onboarding tip to the bottom", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-onboarding-tip--default&args=box:5;placement:bottom");

    cy.scrollTo(0, 200);

    cy.get("dso-onboarding-tip.hydrated").should("be.visible");

    cy.matchImageSnapshot({ capture: "viewport" });
  });
});
