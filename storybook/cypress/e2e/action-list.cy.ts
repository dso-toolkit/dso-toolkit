describe("ActionList", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-action-list--default");
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.dsoCheckA11y("dso-action-list.hydrated");
  });

  it("screenshot", () => {
    cy.get("dso-action-list.hydrated")
      .find("dso-action-list-item.hydrated dso-accordion-section.hydrated")
      .should("have.class", "dso-accordion-neutral")
      .get("dso-action-list.hydrated")
      .find("dso-action-list-item.hydrated dso-accordion-section.hydrated")
      .shadow()
      .find(".dso-section-handle dso-icon.hydrated");

    cy.get("dso-action-list.hydrated").matchImageSnapshot();
  });

  describe("With Warning", () => {
    it("depending on prop warning action list item content has aria-label with number", () => {
      cy.visit("http://localhost:45000/iframe.html?id=core-action-list--with-warning");

      cy.get("dso-action-list.hydrated")
        .find("dso-action-list-item.hydrated")
        .each((item) => {
          const step: number = item.prop("step");
          if (item.prop("itemTitle") !== undefined) {
            cy.wrap(item).shadow().find(".action-list-item-content .sr-only").should("have.text", step + " ");
          } else {
            cy.wrap(item).shadow().find(".action-list-item-content .sr-only").should("not.exist");
          }
        });
    });
  });
});
