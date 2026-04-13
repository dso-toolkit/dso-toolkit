describe("Expandable", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-expandable--default");
  });

  it("should be accessible", () => {
    cy.get("dso-expandable").invoke("prop", "open", true);
    cy.injectAxe();
    cy.dsoCheckA11y("dso-expandable.hydrated");
  });

  it("toggles expandable state with animation", () => {
    cy.get("dso-expandable")
      .as("expandable")
      .should("have.class", "hydrated")
      .invoke("prop", "enableAnimation", true)
      .should("have.attr", "enable-animation");

    const getContainer = () => cy.get("@expandable").shadow().find(".expandable-container");
    const getSlot = () => cy.get("@expandable").shadow().find(".slot-container");

    cy.get("@expandable").should(($el) => {
      expect(["0fr", "0px", "none"]).to.include($el.css("grid-template-rows"));
    });
    getSlot().should("have.css", "visibility", "hidden");

    cy.get("@expandable").invoke("prop", "open", true).should("have.attr", "open");

    getContainer()
      .should("have.attr", "data-open", "true")
      .should(($el) => {
        const rows = $el.css("grid-template-rows");
        expect(rows === "1fr" || rows.endsWith("px")).to.equal(true);
      });

    getSlot().should("have.css", "visibility", "visible");

    cy.get("@expandable").invoke("prop", "open", false);
    getContainer().should(($el) => {
      expect(["0fr", "0px", "none"]).to.include($el.css("grid-template-rows"));
    });

    cy.get("@expandable").should("not.have.attr", "open");
    getContainer().should("not.have.attr", "data-open");
    getSlot().should("have.css", "visibility", "hidden");
  });
});
