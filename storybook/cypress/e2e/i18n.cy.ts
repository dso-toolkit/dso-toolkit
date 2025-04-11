describe("Internationalization", () => {
  it("should find lang='en' through shadow-root boundary", () => {
    cy.visit(`http://localhost:45000/iframe.html?id=core-progress-indicator--large&globals=locale:en`);

    cy.get("#dt-i18n-decorator-container").invoke("remove");

    cy.get("#root-inner").invoke("append", "<div id='shadow-container'></div>");
    cy.get("#shadow-container").invoke("get", 0).invoke("attachShadow", { mode: "open" });
    cy.get("#shadow-container")
      .shadow()
      .invoke("append", "<dso-progress-indicator size='large'></dso-progress-indicator>");

    cy.get("#shadow-container")
      .shadow()
      .find("dso-progress-indicator")
      .shadow()
      .find(".dso-progress-indicator-label")
      .should("have.text", "Loading results. Please wait...");
  });

  it(`should find lang="nl" through shadow-root boundary`, () => {
    cy.visit(`http://localhost:45000/iframe.html?id=core-progress-indicator--large`);

    cy.get("#dt-i18n-decorator-container").invoke("remove");

    cy.get("#root-inner").invoke("append", "<div id='shadow-container'></div>");
    cy.get("#shadow-container").invoke("get", 0).invoke("attachShadow", { mode: "open" });
    cy.get("#shadow-container")
      .shadow()
      .invoke("append", "<dso-progress-indicator size='large'></dso-progress-indicator>");

    cy.get("#shadow-container")
      .shadow()
      .find("dso-progress-indicator")
      .shadow()
      .find(".dso-progress-indicator-label")
      .should("have.text", "Resultaten laden: een moment geduld alstublieft.");
  });

  it("should default to locale 'nl' when no lang attribute is found", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-progress-indicator--large");

    cy.document().get("html").invoke("removeAttr", "lang");

    cy.get("dso-progress-indicator.hydrated")
      .shadow()
      .find(".dso-progress-indicator-label")
      .should("have.text", "Resultaten laden: een moment geduld alstublieft.");
  });

  it("should default to locale 'nl' when lang attribute is unknown", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-progress-indicator--large&globals=locale:unknown");

    cy.document().get("html").should("have.attr", "lang", "unknown");

    cy.get("dso-progress-indicator.hydrated")
      .shadow()
      .find(".dso-progress-indicator-label")
      .should("have.text", "Resultaten laden: een moment geduld alstublieft.");
  });
});
