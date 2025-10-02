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

  it("should set the label", () => {
    cy.get("dso-icon-button.hydrated")
      .invoke("attr", "label", "Hamburger menu")
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

// Helperfunctie voor tooltip position check
function checkTooltipPosition(placement: TooltipPlacement, expectedTop: number, expectedLeft: number) {
  cy.get("dso-icon-button.hydrated").invoke("attr", "tooltip-placement", placement);

  cy.get("dso-icon-button.hydrated")
    .realHover()
    .shadow()
    .find(".dso-tooltip")
    .should(($tooltip) => {
      const style = $tooltip[0].style;
      const top = Math.round(parseFloat(style.top || "0"));
      const left = Math.round(parseFloat(style.left || "0"));

      expect(top).to.equal(expectedTop);
      expect(left).to.equal(expectedLeft);
    });
}
