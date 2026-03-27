describe("Input Range", () => {
  beforeEach(() => {
    cy.visit(`http://localhost:45000/iframe.html?id=core-input-range--default`);
  });

  it("should pass props through to the input", () => {
    cy.get("dso-input-range")
      .invoke("attr", "min", 10)
      .invoke("attr", "max", 90)
      .invoke("attr", "step", 5)
      .invoke("attr", "value", 50)
      .invoke("attr", "label", "Bereik")
      .invoke("attr", "description", "Kies een waarde")
      .invoke("attr", "unit", "px");

    cy.get("dso-input-range.hydrated")
      .shadow()
      .find('input[type="range"]')
      .should("have.attr", "min", "10")
      .and("have.attr", "max", "90")
      .and("have.attr", "step", "5")
      .and("have.value", "50")
      .and("have.attr", "aria-label", "Bereik")
      .and("have.attr", "aria-describedby", "description");

    cy.get("dso-input-range.hydrated").shadow().find("#description").should("have.text", "Kies een waarde");
    cy.get("dso-input-range.hydrated").shadow().find(".counter").first().should("have.text", "10px");
    cy.get("dso-input-range.hydrated").shadow().find(".counter").last().should("have.text", "90px");

    cy.get("dso-input-range.hydrated").matchImageSnapshot();
  });
});
