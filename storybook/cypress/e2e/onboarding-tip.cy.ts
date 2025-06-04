describe("Onboarding Tip", () => {
  beforeEach(() => {
    cy.viewport(1200, 800).visit("http://localhost:45000/iframe.html?id=core-onboarding-tip--default");
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.dsoCheckA11y("dso-onboarding-tip.hydrated");
  });

  function prepareComponent() {
    cy.get(".board")
      .as("dsoBoard")
      .find("dso-onboarding-tip.hydrated")
      .as("dsoOnboardingTip")
      .shadow()
      .find("button.dso-close")
      .as("dsoCloseButton");
  }

  it("should render onboarding tip", () => {
    prepareComponent();

    cy.get("@dsoOnboardingTip").should("not.have.class", "fade-in");

    cy.matchImageSnapshot({ capture: "viewport" });
  });

  it("should hide onboarding tip when its outside the viewport", () => {
    prepareComponent();

    cy.scrollTo(0, 1000)
      .get("@dsoOnboardingTip")
      .should("have.css", "visibility", "hidden")
      .should("have.css", "opacity", "0");

    cy.matchImageSnapshot({ capture: "viewport" });
  });

  it("should place onboarding tip to the left", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-onboarding-tip--default&args=box:5;placement:left");

    prepareComponent();

    cy.matchImageSnapshot({ capture: "viewport" });
  });

  it("should place onboarding tip to the right", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-onboarding-tip--default&args=box:5;placement:right");

    prepareComponent();

    cy.matchImageSnapshot({ capture: "viewport" });
  });

  it("should place onboarding tip to the top", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-onboarding-tip--default&args=box:5;placement:top");

    prepareComponent();

    cy.matchImageSnapshot({ capture: "viewport" });
  });

  it("should place onboarding tip to the bottom", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-onboarding-tip--default&args=box:5;placement:bottom");

    prepareComponent();

    cy.scrollTo(0, 200);

    cy.matchImageSnapshot({ capture: "viewport" });
  });
});
