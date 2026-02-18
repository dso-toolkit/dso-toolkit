describe("Map Message", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-map-message--default");
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.dsoCheckA11y("dso-map-message.hydrated");
  });

  it("matches snapshot", () => {
    cy.get("dso-map-message.hydrated").matchImageSnapshot();
  });
});
