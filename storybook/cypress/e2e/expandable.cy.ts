describe("Expandable", () => {
  it("hides content with overflow-hidden when not fully open", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-expandable--default")
      .get("dso-expandable")
      .should("have.class", "hydrated")
      .invoke("prop", "enableAnimation", true)
      .should("have.class", "dso-animate-ready")
      .and("have.css", "transition", "grid-template-rows 0.26s cubic-bezier(0.4, 0, 0.2, 1) 0s")
      .and("have.css", "grid-template-rows", "0px") // equivalent with 0fr
      .invoke("prop", "open", true)
      .get("dso-expandable")
      .should("have.attr", "open")
      .get("dso-expandable")
      .should("have.css", "grid-template-rows", "73px") // equivalent with 1fr
      .get("dso-expandable")
      .invoke("prop", "open", false)
      .should("not.have.attr", "open");
  });
});
