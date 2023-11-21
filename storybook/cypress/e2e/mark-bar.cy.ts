describe("Mark Bar", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-mark-bar--default");
  });

  it("shows current and totalCount", () => {
    cy.get("dso-mark-bar").invoke("prop", "current", 1).invoke("prop", "totalCount", 10).shadow().contains("1/10");
  });

  it("sets disabled states", () => {
    cy.get("dso-mark-bar")
      .invoke("prop", "current", 1)
      .invoke("prop", "totalCount", 10)
      .shadow()
      .contains("Vorig zoekresultaat")
      .as("previous")
      .should("be.disabled")
      .get("dso-mark-bar")
      .shadow()
      .contains("Volgend zoekresultaat")
      .should("not.be.disabled")
      .get("dso-mark-bar")
      .invoke("prop", "current", 2)
      .shadow()
      .contains("Vorig zoekresultaat")
      .should("not.be.disabled")
      .get("dso-mark-bar")
      .shadow()
      .contains("Volgend zoekresultaat")
      .should("not.be.disabled")
      .get("dso-mark-bar")
      .invoke("prop", "current", 10)
      .shadow()
      .contains("Vorig zoekresultaat")
      .should("not.be.disabled")
      .get("dso-mark-bar")
      .shadow()
      .contains("Volgend zoekresultaat")
      .should("be.disabled");
  });

  it("emits events", () => {
    cy.get("dso-mark-bar")
      .invoke("prop", "current", 2)
      .invoke("prop", "totalCount", 10)
      .then(($markBar) =>
        $markBar
          .on("dsoInput", cy.stub().as("dsoInput"))
          .on("dsoNext", cy.stub().as("dsoNext"))
          .on("dsoPrevious", cy.stub().as("dsoPrevious"))
          .on("dsoClear", cy.stub().as("dsoClear"))
      )
      .shadow()
      .as("shadow")
      .contains("Vorig zoekresultaat")
      .click()
      .get("@shadow")
      .contains("Volgend zoekresultaat")
      .click()
      .get("@shadow")
      .find("input")
      .type("test")
      .get("@shadow")
      .contains("Zoekopdracht legen")
      .click()
      .get("@dsoInput")
      .invoke("getCalls")
      .as("calls")
      .its("length")
      .should("equal", 4)
      .get("@calls")
      .invoke("at", -1)
      .its("args.0.detail.value")
      .should("equal", "test")
      .get("@dsoNext")
      .should("have.been.calledOnce")
      .get("@dsoPrevious")
      .should("have.been.calledOnce")
      .get("@dsoClear")
      .should("have.been.calledOnce");
  });
});
