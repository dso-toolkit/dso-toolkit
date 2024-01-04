describe("Expandable", () => {
  it.skip("hides content with overflow-hidden when not fully open", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-expandable--default")
      .get("dso-expandable")
      .should("have.class", "hydrated")
      .invoke("prop", "enableAnimation", true)
      .should("have.class", "dso-animate-ready")
      .invoke("prop", "open", true)
      .get("dso-expandable")
      .should("have.css", "overflow-y", "hidden")
      .and("not.have.attr", "is-open")
      .get("dso-expandable")
      .should("have.attr", "is-open")
      .get("dso-expandable")
      .and("have.attr", "open")
      .get("dso-expandable")
      .should("have.css", "overflow-y", "visible")
      .get("dso-expandable")
      .invoke("prop", "open", false)
      .should("not.have.attr", "open")
      .get("dso-expandable")
      .should("not.have.attr", "is-open")
      .get("dso-expandable")
      .should("have.css", "overflow-y", "hidden");
  });
});
