describe("Logo", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-logo--default");
  });

  it("not shows a label", () => {
    cy.get("dso-logo")
      .should("not.have.attr", "label", "Beheerportaal")
      .shadow()
      .find(".logo-label")
      .should("not.exist");
    cy.get("dso-logo").shadow().find(".logo-wordmark").should("exist");
    cy.get("dso-logo.hydrated").matchImageSnapshot();
    cy.injectAxe();
    cy.dsoCheckA11y("dso-logo.hydrated");
  });

  it("should show an alternative wordmark when name is provided", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-logo--with-name");
    cy.get("dso-logo").shadow().find(".logo-wordmark-omgevings").should("have.text", "Environment & Planning");
    cy.get("dso-logo").shadow().find(".logo-wordmark-loket").should("have.text", " Portal");

    cy.get("dso-logo.hydrated").matchImageSnapshot();
  });

  it("should show default wordmark when name is not provided (undefined)", () => {
    cy.get("dso-logo")
      .invoke("prop", "name", undefined)
      .shadow()
      .find(".logo-wordmark-omgevings")
      .should("be.visible")
      .and("have.text", "Omgevings")
      .get("dso-logo.hydrated")
      .shadow()
      .find(".logo-wordmark-loket")
      .should("be.visible")
      .and("have.text", "loket");
  });

  it("should show only the first part of the wordmark when name is provided without seperator (|)", () => {
    cy.get("dso-logo")
      .invoke("prop", "name", "GeenPipe")
      .shadow()
      .find(".logo-wordmark-omgevings")
      .should("be.visible")
      .and("have.text", "GeenPipe")
      .get("dso-logo.hydrated")
      .shadow()
      .find(".logo-wordmark-loket")
      .should("not.exist");
  });

  it("should have an anchor surrounding the logo and the logo-wordmark", () => {
    cy.get("dso-logo")
      .invoke("prop", "logoUrl", "/")
      .should("have.attr", "logo-url", "/")
      .then(($logo) => {
        $logo.on("dsoLogoClick", ($event) => $event.detail.originalEvent.preventDefault());
        $logo.on("dsoLogoClick", cy.stub().as("logoClickListener"));
      })
      .shadow()
      .find("a[href='/']")
      .as("logoAnchor")
      .click()
      .get("@logoClickListener")
      .its("callCount")
      .should("equal", 1)
      .get("@logoClickListener")
      .invoke("getCall", "0")
      .its("args.0.detail")
      .should("deep.contain", { url: "/", isModifiedEvent: false })
      // Ctrl
      .get("@logoAnchor")
      .click({ ctrlKey: true })
      .get("@logoClickListener")
      .invoke("getCalls")
      .invoke("at", -1)
      .its("args.0.detail.isModifiedEvent")
      .should("equal", true)
      // Command
      .get("@logoAnchor")
      .click({ commandKey: true })
      .get("@logoClickListener")
      .invoke("getCalls")
      .invoke("at", -1)
      .its("args.0.detail.isModifiedEvent")
      .should("equal", true)
      // Shift
      .get("@logoAnchor")
      .click({ shiftKey: true })
      .get("@logoClickListener")
      .invoke("getCalls")
      .invoke("at", -1)
      .its("args.0.detail.isModifiedEvent")
      .should("equal", true)
      // Alt
      .get("@logoAnchor")
      .click({ altKey: true })
      .get("@logoClickListener")
      .invoke("getCalls")
      .invoke("at", -1)
      .its("args.0.detail.isModifiedEvent")
      .should("equal", true)
      // Right Click
      .get("@logoAnchor")
      .rightclick()
      .get("@logoClickListener")
      .invoke("getCalls")
      .invoke("at", -1)
      .its("args.0.detail.isModifiedEvent")
      .should("equal", true);
    cy.injectAxe();
    cy.dsoCheckA11y("dso-logo.hydrated");
  });

  it("should have an anchor surrounding the label", () => {
    cy.get("dso-logo")
      .invoke("prop", "label", "Regels op de kaart")
      .invoke("prop", "labelUrl", "regels-op-de-kaart")
      .should("have.attr", "label", "Regels op de kaart")
      .and("have.attr", "label-url", "regels-op-de-kaart")
      .then(($logo) => {
        $logo.on("dsoLabelClick", ($event) => $event.detail.originalEvent.preventDefault());
        $logo.on("dsoLabelClick", cy.stub().as("labelClickListener"));
      })
      .shadow()
      .find("a[href='regels-op-de-kaart']")
      .as("labelAnchor")
      .click()
      .get("@labelClickListener")
      .its("callCount")
      .should("equal", 1)
      .get("@labelClickListener")
      .invoke("getCall", "0")
      .its("args.0.detail")
      .should("deep.contains", { url: "regels-op-de-kaart", isModifiedEvent: false })
      // Ctrl
      .get("@labelAnchor")
      .click({ ctrlKey: true })
      .get("@labelClickListener")
      .invoke("getCalls")
      .invoke("at", -1)
      .its("args.0.detail.isModifiedEvent")
      .should("equal", true)
      // Command
      .get("@labelAnchor")
      .click({ commandKey: true })
      .get("@labelClickListener")
      .invoke("getCalls")
      .invoke("at", -1)
      .its("args.0.detail.isModifiedEvent")
      .should("equal", true)
      // Shift
      .get("@labelAnchor")
      .click({ shiftKey: true })
      .get("@labelClickListener")
      .invoke("getCalls")
      .invoke("at", -1)
      .its("args.0.detail.isModifiedEvent")
      .should("equal", true)
      // Alt
      .get("@labelAnchor")
      .click({ altKey: true })
      .get("@labelClickListener")
      .invoke("getCalls")
      .invoke("at", -1)
      .its("args.0.detail.isModifiedEvent")
      .should("equal", true)
      // Right Click
      .get("@labelAnchor")
      .rightclick()
      .get("@labelClickListener")
      .invoke("getCalls")
      .invoke("at", -1)
      .its("args.0.detail.isModifiedEvent")
      .should("equal", true);
    cy.injectAxe();
    cy.dsoCheckA11y("dso-logo.hydrated");
  });

  it("shows a label and logo-wordmark on screens wider than 767px", () => {
    cy.get("dso-logo")
      .invoke("prop", "label", "Beheerportaal")
      .should("have.attr", "label", "Beheerportaal")
      .shadow()
      .find(".logo-label")
      .should("be.visible");
    cy.get("dso-logo").invoke("prop", "label", "Beheerportaal").shadow().find(".logo-wordmark").should("be.visible");
    cy.get("dso-logo.hydrated").matchImageSnapshot();
    cy.injectAxe();
    cy.dsoCheckA11y("dso-logo.hydrated");
  });

  it("shows a label and no logo-wordmark on screens smaller than 768px", () => {
    cy.viewport(400, 720);
    cy.get("dso-logo")
      .invoke("prop", "label", "Beheerportaal")
      .should("have.attr", "label", "Beheerportaal")
      .shadow()
      .find(".logo-label")
      .should("be.visible")
      .should("have.text", "Beheerportaal");
    cy.get("dso-logo")
      .invoke("prop", "label", "Beheerportaal")
      .shadow()
      .find(".logo-wordmark")
      .should("not.be.visible");
    cy.get("dso-logo.hydrated").matchImageSnapshot();
    cy.injectAxe();
    cy.dsoCheckA11y("dso-logo.hydrated");
  });

  it("shows the beta tag", () => {
    cy.get("dso-logo")
      .invoke("attr", "ribbon", "beta")
      .shadow()
      .find(".logo-ribbon")
      .should("be.visible")
      .should("have.text", "beta");
    cy.get("dso-logo.hydrated").matchImageSnapshot();
    cy.injectAxe();
    cy.dsoCheckA11y("dso-logo.hydrated");
  });

  it("should be accessible", () => {
    cy.get("dso-logo.hydrated").matchImageSnapshot();
    cy.injectAxe();
    cy.dsoCheckA11y("dso-logo.hydrated");
  });
});
