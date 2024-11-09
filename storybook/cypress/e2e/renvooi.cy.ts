describe("Renvooi", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-renvooi--default");
  });

  it("renders RenvooiValue", () => {
    cy.get("dso-renvooi.hydrated")
      .as("renvooi")
      .invoke("prop", "value", "ongewijzigd")
      .shadow()
      .find("span.text")
      .should("contain", "ongewijzigd")
      .matchImageSnapshot("ongewijzigd");

    cy.get("@renvooi")
      .invoke("prop", "value", { toegevoegd: "toegevoegd" })
      .shadow()
      .find("ins")
      .should("contain", "toegevoegd")
      .matchImageSnapshot("toegevoegd");

    cy.get("@renvooi")
      .invoke("prop", "value", { verwijderd: "verwijderd" })
      .shadow()
      .find("del")
      .should("contain", "verwijderd")
      .matchImageSnapshot("verwijderd");

    cy.get("@renvooi")
      .invoke("prop", "value", { was: "oude waarde", wordt: "nieuwe waarde" })
      .shadow()
      .find("del")
      .should("contain", "oude waarde")
      .get("@renvooi")
      .shadow()
      .find("ins")
      .should("contain", "nieuwe waarde")
      .matchImageSnapshot("was-wordt");
  });
});
