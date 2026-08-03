describe("Selectable", () => {
  it("should toggle info using instance method", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-selectable--with-info");

    cy.injectAxe();
    cy.dsoCheckA11y("dso-selectable.hydrated");

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
    cy.dsoCheckA11y("dso-selectable.hydrated");

    cy.get("dso-selectable").invoke("prop", "checked", "true").find('input[type="checkbox"]').should("be.checked");

    cy.get("dso-selectable").click("left");

    cy.get("dso-selectable").find('input[type="checkbox"]').should("be.checked");
  });

  it("references the error message with aria-describedby", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-selectable--checkbox");

    cy.get("dso-selectable.hydrated").find("input").should("not.have.attr", "aria-describedby");

    cy.get("dso-selectable.hydrated").invoke("prop", "errormessage", "abc");

    cy.get("dso-selectable.hydrated").find("input").should("have.attr", "aria-describedby", "abc");
  });

  it("combines describedById and errormessage in aria-describedby", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-selectable--with-info");

    cy.get("dso-selectable.hydrated")
      .invoke("prop", "infoFixed", true)
      .invoke("prop", "describedById", "123")
      .invoke("prop", "errormessage", "abc");

    cy.get("dso-selectable.hydrated").find("input").should("have.attr", "aria-describedby", "123 abc");

    cy.get("dso-selectable.hydrated").then(($selectable) => ($selectable[0].errormessage = undefined));

    cy.get("dso-selectable.hydrated").find("input").should("have.attr", "aria-describedby", "123");
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
