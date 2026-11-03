describe("Link icon padding", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=html-css-link--mail-link-with-icon");
  });

  it("keeps only the left padding for a mailto link with an extern class", () => {
    cy.get("a[href^='mailto:']")
      .invoke("addClass", "extern")
      .should("have.css", "padding-left", "24px")
      .and("have.css", "padding-right", "0px");
  });

  it("keeps only the left padding for a mailto link with a download class", () => {
    cy.get("a[href^='mailto:']")
      .invoke("addClass", "download")
      .should("have.css", "padding-left", "24px")
      .and("have.css", "padding-right", "0px");
  });
});
