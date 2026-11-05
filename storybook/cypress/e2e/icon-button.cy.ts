import { TooltipPlacement } from "@dso-toolkit/core";

describe("Icon Button", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-icon-button--secondary");
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.dsoCheckA11y("dso-icon-button.hydrated");
  });

  const variants = ["secondary", "tertiary", "map"];

  variants.forEach((variant) => {
    it(`should show the ${variant} variant`, () => {
      cy.get("dso-icon-button.hydrated").invoke("prop", "variant", variant);
      cy.get("dso-icon-button.hydrated").realHover().shadow().find(".dso-tooltip").should("exist");
      cy.get("dso-icon-button.hydrated").trigger("mouseleave");
      cy.get("dso-icon-button.hydrated").matchImageSnapshot(`${Cypress.currentTest.title}`);
    });
  });

  it("should correctly render aria-label and aria-pressed based on toggled state", () => {
    cy.get("dso-icon-button.hydrated").as("button");

    cy.get("@button").shadow().find("button").should("not.have.attr", "aria-pressed");

    cy.get("@button").invoke("prop", "label", "Hamburger menu").invoke("prop", "toggled", false);

    cy.get("@button")
      .shadow()
      .find("button")
      .should("have.attr", "aria-pressed", "false")
      .and("have.attr", "aria-label", "Hamburger menu");

    cy.get("@button").invoke("prop", "toggled", true);

    cy.get("@button")
      .shadow()
      .find("button")
      .should("have.attr", "aria-pressed", "true")
      .and("have.attr", "aria-label", "Hamburger menu");
  });

  it("should fall back to the label when tooltip is removed", () => {
    cy.get("dso-icon-button.hydrated")
      .invoke("attr", "label", "Hamburger menu")
      .invoke("attr", "tooltip", "Hamburger")
      .shadow()
      .find(".dso-tooltip .tooltip-inner")
      .should("have.text", "Hamburger");

    cy.get("dso-icon-button.hydrated")
      .invoke("removeAttr", "tooltip")
      .shadow()
      .find(".dso-tooltip .tooltip-inner")
      .should("have.text", "Hamburger menu");
  });

  const placements: Record<TooltipPlacement, [number, number]> = {
    top: [275, 453],
    right: [318, 531],
    bottom: [361, 453],
    left: [318, 376],
  };

  Object.entries(placements).forEach(([placement, [expectedTop, expectedLeft]]) => {
    it(`should place the tooltip correctly when tooltip-placement is ${placement}`, () => {
      checkTooltipPosition(placement as "top" | "right" | "bottom" | "left", expectedTop, expectedLeft);
    });
  });
});

describe("Icon Button with tooltip", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-icon-button--secondary", {
      onBeforeLoad(win) {
        cy.stub(win.console, "warn").as("consoleWarn");
      },
    });

    cy.get("dso-icon-button.hydrated")
      .invoke("prop", "label", "Verwijder Test project 3 September")
      .invoke("prop", "tooltip", "Verwijder");
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.dsoCheckA11y("dso-icon-button.hydrated");
  });

  it("should show the tooltip text while label stays the accessible name", () => {
    cy.get("dso-icon-button.hydrated").shadow().find(".dso-tooltip .tooltip-inner").should("have.text", "Verwijder");

    cy.get("dso-icon-button.hydrated")
      .shadow()
      .find("button")
      .should("have.attr", "aria-label", "Verwijder Test project 3 September");

    cy.get("@consoleWarn").should("not.have.been.calledWithMatch", /^Icon Button:/);
  });

  const validationCases = [
    { label: "", tooltip: "Verwijder" },
    { label: "Verwijder Test project 3 September", tooltip: "Verwijderen" },
    { label: "Verwijderen Test project", tooltip: "Verwijder" },
    { label: "Verwijder: Test project", tooltip: "Verwijder" },
  ];

  validationCases.forEach(({ label, tooltip }) => {
    it(`should warn for tooltip "${tooltip}" with label "${label}"`, () => {
      cy.get("dso-icon-button.hydrated").invoke("prop", "label", label).invoke("prop", "tooltip", tooltip);

      cy.get("@consoleWarn").should("have.been.calledWithMatch", /^Icon Button: tooltip/);
    });
  });
});

// Helperfunctie voor tooltip position check
function checkTooltipPosition(placement: TooltipPlacement, expectedTop: number, expectedLeft: number) {
  cy.get("dso-icon-button.hydrated").invoke("attr", "tooltip-placement", placement);

  cy.get("dso-icon-button.hydrated")
    .realHover()
    .shadow()
    .find(".dso-tooltip")
    .should(($tooltip) => {
      const style = $tooltip[0]?.style;
      const top = Math.round(parseFloat(style?.top || "0"));
      const left = Math.round(parseFloat(style?.left || "0"));

      expect(top).to.equal(expectedTop);
      expect(left).to.equal(expectedLeft);
    });
}
