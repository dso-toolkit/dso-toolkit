const mapMessageSelector = "dso-map-message.hydrated";
const storybookBaseUrl = "http://localhost:45000/iframe.html?id=core-map-message--";

describe("dso-map-message - Storybook slot rendering", () => {
  it("renders success variant and ARIA role", () => {
    cy.visit(`${storybookBaseUrl}success`);
    cy.get(mapMessageSelector).should("have.attr", "variant", "success");
    cy.get(mapMessageSelector).shadow().find(".map-message-content").should("have.attr", "role", "status");
    cy.get(mapMessageSelector).find('[slot="message"]').should("exist");
  });

  it("renders error variant and ARIA role", () => {
    cy.visit(`${storybookBaseUrl}error`);
    cy.get(mapMessageSelector).should("have.attr", "variant", "error");
    cy.get(mapMessageSelector).shadow().find(".map-message-content").should("have.attr", "role", "alert");
    cy.get(mapMessageSelector).find('[slot="message"]').should("exist");
  });

  it("renders instruction variant and ARIA role", () => {
    cy.visit(`${storybookBaseUrl}instruction`);
    cy.get(mapMessageSelector).should("have.attr", "variant", "instruction");
    cy.get(mapMessageSelector).shadow().find(".map-message-content").should("have.attr", "role", "status");
    cy.get(mapMessageSelector).find('[slot="message"]').should("exist");
  });

  it("should be accessible", () => {
    cy.visit(`${storybookBaseUrl}success`);
    cy.injectAxe();
    cy.dsoCheckA11y(mapMessageSelector);
  });

  it("renders message and actions slots in success story", () => {
    cy.visit(`${storybookBaseUrl}success`);

    cy.get(mapMessageSelector)
      .shadow()
      .find('slot[name="message"]')
      .should("exist")
      .then(($slot) => {
        const assigned = ($slot[0] as HTMLSlotElement).assignedNodes({ flatten: true });
        const text = assigned.map((node) => node.textContent?.trim()).join(" ");
        expect(text).to.contain("Dit is een succes kaartbericht.");
      });

    cy.get(mapMessageSelector)
      .shadow()
      .find('slot[name="actions"]')
      .should("exist")
      .then(($slot) => {
        const assigned = ($slot[0] as HTMLSlotElement).assignedElements({ flatten: true });
        expect(assigned.length).to.be.greaterThan(0);
        const labels = assigned.map((el) => el.textContent?.trim());
        expect(labels).to.include("Ongedaan maken");
        expect(labels).to.include("Volgende");
      });
  });

  it("should render visually correct for each variant", () => {
    ["success", "error", "instruction"].forEach((variant) => {
      cy.visit(`${storybookBaseUrl}${variant}`);
      cy.get(mapMessageSelector).should("be.visible").shadow().find(".map-message-content").should("exist");
      cy.get(mapMessageSelector).matchImageSnapshot(`dso-map-message-${variant}`);
    });
  });
});
