describe("Toggletip - Information", () => {
  function prepareComponent() {
    cy.get("dso-toggletip.hydrated")
      .as("dsoToggletip")
      .shadow()
      .find("dso-info-button")
      .as("dsoInfoButton")
      .shadow()
      .find("dso-icon-button")
      .as("dsoIconButton")
      .shadow()
      .find("button")
      .as("dsoButton")
      .get("@dsoToggletip")
      .shadow()
      .find(".dso-tooltip")
      .as("dsoTooltip");
  }

  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-toggletip--information");
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.dsoCheckA11y("dso-toggletip.hydrated");
  });

  it("should focus on button after escape", () => {
    prepareComponent();

    cy.get("@dsoButton")
      .click()
      .get("@dsoTooltip")
      .should("have.class", "visible")
      .realPress("Tab")
      .get("@dsoButton")
      .should("not.have.focus")
      .realPress("Escape")
      .get("@dsoIconButton")
      .should("have.focus")
      .get("@dsoTooltip")
      .should("not.have.class", "visible");
  });

  it("screenshot", () => {
    prepareComponent();

    cy.get("@dsoToggletip").matchImageSnapshot(`Toggletip - Information - ${Cypress.currentTest.title}`);

    cy.get("@dsoButton")
      .click()
      .matchImageSnapshot(`Toggletip - Information - With Visible Tooltip -${Cypress.currentTest.title}`, {
        padding: [250, 400, 250, 50],
      });
  });
});

describe("Toggletip - Badge", () => {
  function prepareComponent() {
    cy.get("dso-toggletip.hydrated").as("dsoToggletip").shadow().find(".badge-button").as("badgeButton");
  }

  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-toggletip--badge");

    cy.injectAxe();
  });

  it("should show a Tooltip on hover", () => {
    prepareComponent();

    cy.get("@badgeButton").realHover().find(".dso-tooltip").should("exist");
  });

  const statusses = [undefined, "attention", "error", "info", "outline", "primary", "success", "warning"];

  statusses.map((status) => {
    it(`${status} - should be accessible`, () => {
      prepareComponent();

      cy.get("@dsoToggletip").invoke("prop", "status", status);

      cy.dsoCheckA11y("dso-toggletip.hydrated");
    });

    it(`${status} - screenshot`, () => {
      prepareComponent();

      cy.get("@dsoToggletip")
        .invoke("prop", "status", status)
        .matchImageSnapshot(`Toggletip - Badge - ${Cypress.currentTest.title}`);

      cy.get("@badgeButton")
        .click()
        .matchImageSnapshot(`Toggletip - Badge - With Visible Tooltip - ${Cypress.currentTest.title}`, {
          padding: [250, 400, 250, 50],
        });
    });
  });
});
