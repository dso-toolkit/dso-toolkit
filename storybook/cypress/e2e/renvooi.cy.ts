describe("Renvooi", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-renvooi--default");
  });

  it("allows setting text-decoration using --_dso-renvooi-text-decoration", () => {
    cy.get("dso-renvooi.hydrated")
      .invoke("prop", "value", "ongewijzigd")
      .invoke("attr", "style", "--_dso-renvooi-text-decoration: line-through")
      .shadow()
      .find("span.text")
      .should("have.css", "text-decoration-line", "line-through");
  });

  it("renders RenvooiValue default", () => {
    cy.get("dso-renvooi.hydrated")
      .as("renvooi")
      .invoke("prop", "value", "ongewijzigd")
      .shadow()
      .find("span.text")
      .should("contain", "ongewijzigd")
      .get("@renvooi")
      .matchImageSnapshot();
  });

  it("renders RenvooiValue toegevoegd", () => {
    cy.get("dso-renvooi.hydrated")
      .as("renvooi")
      .invoke("prop", "value", { toegevoegd: "toegevoegd" })
      .shadow()
      .find("ins")
      .should("contain", "toegevoegd")
      .get("@renvooi")
      .matchImageSnapshot();
  });

  it("renders RenvooiValue verwijderd", () => {
    cy.get("dso-renvooi.hydrated")
      .as("renvooi")
      .invoke("prop", "value", { verwijderd: "verwijderd" })
      .shadow()
      .find("del")
      .should("contain", "verwijderd")
      .get("@renvooi")
      .matchImageSnapshot();
  });

  it("renders RenvooiValue was-wordt", () => {
    cy.get("dso-renvooi.hydrated")
      .as("renvooi")
      .invoke("prop", "value", { was: "oude waarde", wordt: "nieuwe waarde" })
      .shadow()
      .find("del")
      .should("contain", "oude waarde")
      .get("@renvooi")
      .shadow()
      .find("ins")
      .should("contain", "nieuwe waarde")
      .get("@renvooi")
      .matchImageSnapshot();
  });
});
