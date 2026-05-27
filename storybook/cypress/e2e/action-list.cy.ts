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
          if (item.prop("warning") === false) {
            cy.wrap(item)
              .shadow()
              .find(".action-list-item-content")
              .should("have.attr", "aria-label", item.prop("step"));
          } else {
            cy.wrap(item).shadow().find(".action-list-item-content").should("not.have.attr", "aria-label");
          }
        });
    });
  });
});
