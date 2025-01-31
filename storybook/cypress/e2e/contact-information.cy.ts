describe("Contact information", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-contact-information--default");
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.dsoCheckA11y("dso-contact-information.hydrated");
  });

  it("matches snapshot", () => {
    cy.get(`dso-contact-information.hydrated`).matchImageSnapshot();
  });
});
