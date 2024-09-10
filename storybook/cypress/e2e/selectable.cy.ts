describe("Selectable", () => {
  it("should toggle info using instance method", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-selectable--with-info");

    cy.injectAxe();
    cy.checkA11y("dso-selectable");

    cy.get("dso-selectable.hydrated").matchImageSnapshot();

    cy.get("dso-selectable .dso-rich-content").as("info-content").should("exist").and("not.be.visible");

    toggleInfo();
    cy.get("@info-content").should("be.visible");

    toggleInfo(false);
    cy.get("@info-content").should("not.be.visible");

    toggleInfo(true);
    cy.get("@info-content").should("be.visible");

    function toggleInfo(active?: boolean) {
      cy.get("dso-selectable").then(($s) => $s[0].toggleInfo(active));
    }
  });

  it("supports controlled input", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-selectable--checkbox");

    cy.injectAxe();
    cy.checkA11y("dso-selectable");

    cy.get("dso-selectable").invoke("prop", "checked", "true").find('input[type="checkbox"]').should("be.checked");

    cy.get("dso-selectable").click("left");

    cy.get("dso-selectable").find('input[type="checkbox"]').should("be.checked");
  });

  it("supports uncontrolled input", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-selectable--checkbox");

    cy.get("dso-selectable")
      .should("not.have.a.property", "checked")
      .get("dso-selectable")
      .find('input[type="checkbox"]')
      .should("not.be.checked");

    cy.get("dso-selectable").click("left");

    cy.get("dso-selectable").find('input[type="checkbox"]').should("be.checked");
  });
});
