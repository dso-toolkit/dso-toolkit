describe("Contact information", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-contact-information--default");
    cy.get(`dso-contact-information.hydrated`).as("contactInformation");
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.dsoCheckA11y("dso-contact-information.hydrated");
  });

  it("matches snapshot", () => {
    cy.get("@contactInformation").matchImageSnapshot();
  });

  it("title should match the expected value", () => {
    cy.get("@contactInformation").find("h5").should("have.text", "Gemeente Utrecht");
  });

  it("should check if anchor texts match expected values", () => {
    const expectedTexts = ["14-303", "noreply@dso-toolkit.nl", "Online contactformulier", "www.utrecht.nl"];

    cy.get("@contactInformation")
      .find("a")
      .each((anchor, index) => {
        cy.wrap(anchor).find("span:first").invoke("text").should("equal", expectedTexts[index]);
      });
  });

  it("should check if info items texts match expected values", () => {
    const expectedTexts = [
      "Bezoekadres: Stadsplateau 1, 3521AZ Utrecht",
      "Postadres: afd. Bouwvergunningen, Postbus 100, 3500AA Utrecht",
    ];

    cy.get("@contactInformation")
      .find("ul[slot='info'] > li")
      .each((anchor, index) => {
        cy.wrap(anchor).invoke("text").should("equal", expectedTexts[index]);
      });
  });
});
