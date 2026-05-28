describe("Attachments Counter", () => {
  it("should be accessible and match snapshot", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-attachments-counter--attachments-counter");

    cy.injectAxe();
    cy.dsoCheckA11y("dso-attachments-counter.hydrated");

    cy.get("dso-attachments-counter.hydrated").should("exist").matchImageSnapshot();
  });
});
