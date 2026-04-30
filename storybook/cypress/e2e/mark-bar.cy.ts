describe("Mark Bar", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-mark-bar--default");
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.dsoCheckA11y("dso-mark-bar.hydrated");
  });

  it("should have correct ARIA attributes", () => {
    cy.get("dso-mark-bar.hydrated").shadow().find(".dso-button-container span[role='status']").should("exist");
  });

  it("shows current and totalCount", () => {
    cy.get("dso-mark-bar.hydrated")
      .invoke("prop", "current", 1)
      .invoke("prop", "totalCount", 10)
      .shadow()
      .contains("1/10");
  });

  it("sets label", () => {
    cy.get("dso-mark-bar.hydrated")
      .invoke("prop", "label", "test")
      .shadow()
      .as("shadowRoot")
      .find("label")
      .contains("test")
      .get("@shadowRoot")
      .find('input[type="text"]')
      .invoke("attr", "placeholder")
      .should("equal", " ");
  });

  it("sets disabled states", () => {
    cy.get("dso-mark-bar.hydrated")
      .invoke("prop", "current", 1)
      .invoke("prop", "totalCount", 10)
      .shadow()
      .find("dso-icon-button.hydrated")
      .shadow()

      .find("button[aria-label='Vorig zoekresultaat 0/10']")
      .as("previous")
      .should("be.disabled")
      .get("dso-mark-bar.hydrated")
      .shadow()
      .find("dso-icon-button.hydrated")
      .shadow()
      .find("button[aria-label='Volgend zoekresultaat 2/10']")
      .should("not.be.disabled")
      .get("dso-mark-bar.hydrated")
      .invoke("prop", "current", 2)
      .shadow()
      .find("dso-icon-button.hydrated")
      .shadow()
      .find("button[aria-label='Vorig zoekresultaat 1/10']")
      .should("not.be.disabled")
      .get("dso-mark-bar.hydrated")
      .shadow()
      .find("dso-icon-button.hydrated")
      .shadow()
      .find("button[aria-label='Volgend zoekresultaat 3/10']")
      .should("not.be.disabled")
      .get("dso-mark-bar.hydrated")
      .invoke("prop", "current", 10)
      .shadow()
      .find("dso-icon-button.hydrated")
      .shadow()
      .find("button[aria-label='Vorig zoekresultaat 9/10']")
      .should("not.be.disabled")
      .get("dso-mark-bar.hydrated")
      .shadow()
      .find("dso-icon-button.hydrated")
      .shadow()
      .find("button[aria-label='Volgend zoekresultaat 11/10']")
      .should("be.disabled");
  });

  it("emits events", () => {
    cy.get("dso-mark-bar.hydrated")
      .invoke("prop", "current", 2)
      .invoke("prop", "totalCount", 10)
      .then(($markBar) =>
        $markBar
          .on("dsoInput", cy.stub().as("dsoInput"))
          .on("dsoNext", cy.stub().as("dsoNext"))
          .on("dsoPrevious", cy.stub().as("dsoPrevious"))
          .on("dsoClear", cy.stub().as("dsoClear")),
      )
      .shadow()
      .as("shadow")
      .find("dso-icon-button.hydrated")
      .shadow()
      .find("button[aria-label='Vorig zoekresultaat 1/10']")
      .click()
      .get("@shadow")
      .find("dso-icon-button.hydrated")
      .shadow()
      .find("button[aria-label='Volgend zoekresultaat 3/10']")
      .click()
      .get("@shadow")
      .find('input[type="text"]')
      .focus()
      .type("test")
      .get("@shadow")
      .find("dso-icon-button.hydrated")
      .shadow()
      .find("button[aria-label='Zoekopdracht legen'")
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

  it("focuses the input when dsoFocus() is called", () => {
    cy.get("dso-mark-bar.hydrated")
      .invoke("get", 0)
      .as("markBarElement")
      .invoke("dsoFocus")
      .get("dso-mark-bar")
      .shadow()
      .find('input[type="text"]')
      .as("markBarInput")
      .should("be.focused")
      .type("test")
      .get("@markBarElement")
      .invoke("dsoFocus", { select: true })
      .get<HTMLInputElement>("@markBarInput")
      .then(([input]) => (input ? [input.selectionStart, input.selectionEnd] : [null, null]))
      .should("deep.equal", [0, 4]);
  });

  it('emits "dsoNext" when Enter is pressed', () => {
    cy.get("dso-mark-bar.hydrated")
      .invoke("prop", "current", 2)
      .invoke("prop", "totalCount", 10)
      .then(($markBar) => $markBar.on("dsoNext", cy.stub().as("dsoNext")))
      .get("dso-mark-bar.hydrated")
      .shadow()
      .find('label[for="search-input"]')
      .click()
      .type("{enter}")
      .get("@dsoNext")
      .should("have.been.calledOnce");
  });
});
