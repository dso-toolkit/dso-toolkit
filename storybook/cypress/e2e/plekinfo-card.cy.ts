describe("Plekinfo Card", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-plekinfo-card--default")
      .get("dso-plekinfo-card.hydrated")
      .then(($card) => {
        $card.on("dsoPlekinfoCardClick", cy.stub().as("dsoPlekinfoCardClickListener"));
      });
  });

  it("should be accessible - default", () => {
    cy.injectAxe();
    cy.dsoCheckA11y("dso-plekinfo-card.hydrated");
  });

  it("screenshot", () => {
    cy.get("dso-plekinfo-card.hydrated").matchImageSnapshot();
  });

  it("should call dsoPlekinfoCardClick event when user clicks the title in the heading", () => {
    cy.get("dso-plekinfo-card.hydrated")
      .shadow()
      .find(".dso-plekinfo-card-heading > a")
      .realClick()
      .get("@dsoPlekinfoCardClickListener")
      .should("have.been.calledOnce");
  });

  it("should show different background-color when active='true'", () => {
    cy.get("dso-plekinfo-card.hydrated")
      .invoke("prop", "active", true)
      .shadow()
      .find(".dso-plekinfo-card-container")
      .should("have.css", "background-color", "rgb(229, 229, 229)");

    cy.get("dso-plekinfo-card.hydrated").matchImageSnapshot();
  });

  it("should show compact label with status='warning'", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-plekinfo-card--with-label")
      .get("dso-plekinfo-card.hydrated")
      .find("[slot='meta'] > dso-label[status='warning'][compact]")
      .should("exist");

    cy.get("dso-plekinfo-card.hydrated").matchImageSnapshot();
  });

  it("should show renvooi for changed title", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-plekinfo-card--with-name-change")
      .get("dso-plekinfo-card.hydrated")
      .find("[slot='heading'] > dso-renvooi")
      .should("exist");

    cy.get("dso-plekinfo-card.hydrated").matchImageSnapshot();
  });

  it("should be marked with wijzigactie='verwijder'", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-plekinfo-card--default")
      .get("dso-plekinfo-card.hydrated")
      .invoke("prop", "wijzigactie", "verwijder")
      .shadow()
      .find("del.dso-plekinfo-card-container")
      .should("exist");

    cy.get("dso-plekinfo-card.hydrated").matchImageSnapshot();

    cy.get("dso-plekinfo-card.hydrated")
      .invoke("prop", "active", true)
      .shadow()
      .find("del.dso-plekinfo-card-container")
      .should("have.css", "background-color", "rgb(221, 195, 198)");

    cy.get("dso-plekinfo-card.hydrated").matchImageSnapshot(`${Cypress.currentTest.title} -- active`);
  });

  it("should be marked with wijzigactie='voegtoe'", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-plekinfo-card--default")
      .get("dso-plekinfo-card.hydrated")
      .invoke("prop", "wijzigactie", "voegtoe")
      .shadow()
      .find("ins.dso-plekinfo-card-container")
      .should("exist");

    cy.get("dso-plekinfo-card.hydrated").matchImageSnapshot();

    cy.get("dso-plekinfo-card.hydrated")
      .invoke("prop", "active", true)
      .shadow()
      .find("ins.dso-plekinfo-card-container")
      .should("have.css", "background-color", "rgb(206, 217, 191)");

    cy.get("dso-plekinfo-card.hydrated").matchImageSnapshot(`${Cypress.currentTest.title} -- active`);
  });

  it("should show the title without an anchor", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-plekinfo-card--static")
      .get("dso-plekinfo-card.hydrated")
      .shadow()
      .find(".dso-plekinfo-card-heading > slot[name='heading']")
      .should("exist");

    cy.get("dso-plekinfo-card.hydrated").matchImageSnapshot();
  });

  it("should show a slide toggle", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-plekinfo-card--with-slide-toggle")
      .get("dso-plekinfo-card.hydrated")
      .find("dso-slide-toggle")
      .should("exist");

    cy.get("dso-plekinfo-card.hydrated").matchImageSnapshot();
  });
});
