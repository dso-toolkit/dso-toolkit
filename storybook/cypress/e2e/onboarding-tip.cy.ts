describe("Onboarding Tip", () => {
  const getOnboardingTip = () => cy.get("dso-onboarding-tip.hydrated");
  const shouldShowOnboardingTip = () =>
    getOnboardingTip().should("have.css", "visibility", "visible").should("have.css", "opacity", "1");
  const shouldHideOnboardingTip = () =>
    getOnboardingTip().should("have.css", "visibility", "hidden").should("have.css", "opacity", "0");

  beforeEach(() => {
    cy.viewport(1200, 800).visit("http://localhost:45000/iframe.html?id=core-onboarding-tip--default");
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.dsoCheckA11y("dso-onboarding-tip.hydrated");
  });

  it("should render onboarding tip", () => {
    shouldShowOnboardingTip();

    cy.matchImageSnapshot({ capture: "viewport" });
  });

  it("should hide onboarding tip when it is outside the viewport", () => {
    cy.scrollTo(0, 1000);

    shouldHideOnboardingTip();

    cy.matchImageSnapshot({ capture: "viewport" });
  });

  it("should place onboarding tip to the left", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-onboarding-tip--default&args=box:5;placement:left");

    shouldShowOnboardingTip();

    cy.matchImageSnapshot({ capture: "viewport" });
  });

  it("should place onboarding tip to the right", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-onboarding-tip--default&args=box:5;placement:right");

    shouldShowOnboardingTip();

    cy.matchImageSnapshot({ capture: "viewport" });
  });

  it("should place onboarding tip to the top", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-onboarding-tip--default&args=box:5;placement:top");

    shouldShowOnboardingTip();

    cy.matchImageSnapshot({ capture: "viewport" });
  });

  it("should place onboarding tip to the bottom", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-onboarding-tip--default&args=box:5;placement:bottom");

    cy.scrollTo(0, 200);

    shouldShowOnboardingTip();

    cy.matchImageSnapshot({ capture: "viewport" });
  });
});
