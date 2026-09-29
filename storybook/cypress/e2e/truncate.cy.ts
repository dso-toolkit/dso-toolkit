describe("Truncate", () => {
  it("should not become focusable or show a tooltip when it fits", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-truncate--passend&viewMode=story");

    cy.get("dso-truncate")
      .should("be.visible")
      .and("have.class", "hydrated")
      .shadow()
      .find(".dso-truncate-content")
      .should("not.have.attr", "tabindex");

    cy.get("dso-truncate").matchImageSnapshot();
  });

  it("should become focusable and show a tooltip with the full text when truncated", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-truncate--ingekort&viewMode=story");

    cy.get("dso-truncate")
      .should("be.visible")
      .and("have.class", "hydrated")
      .shadow()
      .find(".dso-truncate-content")
      .should("have.attr", "tabindex", "0")
      .focus();

    cy.get("dso-truncate")
      .shadow()
      .find(".dso-tooltip")
      .should("be.visible")
      .and("contain.text", "Een heel lange omschrijving");
  });

  it("should close the tooltip when Escape is pressed", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-truncate--ingekort&viewMode=story");

    cy.get("dso-truncate")
      .should("be.visible")
      .and("have.class", "hydrated")
      .shadow()
      .find(".dso-truncate-content")
      .should("have.attr", "tabindex", "0")
      .focus();

    cy.get("dso-truncate").shadow().find(".dso-tooltip").should("be.visible");

    cy.get("body").trigger("keydown", { key: "Escape" });

    cy.get("dso-truncate").shadow().find(".dso-tooltip").should("not.be.visible");
  });

  it("should show the renvooi with del/ins markup in the tooltip when truncated", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-truncate--ingekort-met-renvooi&viewMode=story");

    cy.get("dso-truncate")
      .should("be.visible")
      .and("have.class", "hydrated")
      .shadow()
      .find(".dso-truncate-content")
      .should("have.attr", "tabindex", "0")
      .focus();

    cy.get("dso-truncate")
      .shadow()
      .find(".dso-tooltip")
      .should("be.visible")
      .find("dso-renvooi")
      .shadow()
      .find("del")
      .should("exist")
      .and("contain.text", "vergunningplicht");

    cy.get("dso-truncate")
      .shadow()
      .find(".dso-tooltip")
      .find("dso-renvooi")
      .shadow()
      .find("ins")
      .should("exist")
      .and("contain.text", "toegestaan");

    cy.get("dso-truncate").matchImageSnapshot();
  });

  it("should update the tooltip when the renvooi value changes", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-truncate--renvooi-wijziging-na-laden&viewMode=story");

    cy.get("dso-truncate").should("be.visible").and("have.class", "hydrated");

    cy.get("dso-truncate").find("dso-renvooi").invoke("prop", "value", {
      was: "vergunningplicht",
      wordt: "verbodmeldingsplicht",
    });

    cy.get("dso-truncate").shadow().find(".dso-truncate-content").should("have.attr", "tabindex", "0").focus();

    cy.get("dso-truncate")
      .shadow()
      .find(".dso-tooltip")
      .should("be.visible")
      .find("dso-renvooi")
      .shadow()
      .find("del")
      .should("contain.text", "vergunningplicht");

    cy.get("dso-truncate")
      .shadow()
      .find(".dso-tooltip")
      .find("dso-renvooi")
      .shadow()
      .find("ins")
      .should("contain.text", "verbodmeldingsplicht");
  });
  it("should update truncation state when the container is resized", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-truncate--ingekort&viewMode=story");

    cy.get("dso-truncate").should("have.class", "hydrated").invoke("css", "width", "100px");

    cy.get("dso-truncate").shadow().find(".dso-truncate-content").should("have.attr", "tabindex", "0");

    cy.get("dso-truncate").invoke("css", "width", "1000px");

    cy.get("dso-truncate").shadow().find(".dso-truncate-content").should("not.have.attr", "tabindex");
  });
});
