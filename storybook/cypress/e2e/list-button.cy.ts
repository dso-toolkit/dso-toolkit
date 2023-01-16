describe.skip("ListButton", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-list-button--default");
  });

  it("should render label, sublabel and subcontent correctly", () => {
    cy.percySnapshot();

    cy.get("dso-list-button")
      .as("dsoListButton")
      .should("be.visible")
      .shadow()
      .as("dsoListButtonShadow")
      .find(".dso-selectable > label")
      .should("contain.text", "Milieubelastende activiteit - Melding")
      .get("@dsoListButtonShadow")
      .find(".dso-input-number")
      .should("not.exist")
      .get("@dsoListButtonShadow")
      .find(".dso-sublabel")
      .should("not.exist")
      .get("@dsoListButtonShadow")
      .find(".dso-subcontent")
      .should("not.exist")
      .get("@dsoListButton")
      .invoke("attr", "sublabel", "Sublabel")
      .invoke("attr", "subcontent", "Subcontent")
      .get("@dsoListButtonShadow")
      .find(".dso-sublabel")
      .should("contain.text", "Sublabel")
      .get("@dsoListButtonShadow")
      .find(".dso-subcontent")
      .should("contain.text", "Subcontent");
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.checkA11y("dso-list-button");
  });

  it("should render the count correctly", () => {
    cy.get("dso-list-button")
      .as("dsoListButton")
      .invoke("attr", "count", 1)
      .shadow()
      .as("dsoListButtonShadow")
      .find("dso-icon")
      .should("be.visible")
      .get("@dsoListButton")
      .invoke("attr", "count", 3)
      .get("@dsoListButtonShadow")
      .find("dso-icon")
      .should("not.exist")
      .get("@dsoListButtonShadow")
      .find(".dso-count")
      .should("contain.text", "3x");
  });

  it("should render the interactive count input", () => {
    cy.get("dso-list-button")
      .as("dsoListButton")
      .invoke("attr", "count", 8)
      .invoke("attr", "has-input-number", "")
      .shadow()
      .as("dsoListButtonShadow")
      .find(".dso-input-step-counter")
      .should("be.visible")
      .should("have.value", 8)
      .get("@dsoListButtonShadow")
      .find(".dso-input-number button.dso-tertiary")
      .should("have.length", 2);
  });

  it("should hide the minus button when count is 1", () => {
    cy.get("dso-list-button")
      .as("dsoListButton")
      .invoke("attr", "count", 1)
      .invoke("attr", "has-input-number", "")
      .shadow()
      .as("dsoListButtonShadow")
      .get("@dsoListButtonShadow")
      .find(".dso-input-number button.dso-tertiary")
      .should("have.length", 1)
      .get("@dsoListButtonShadow")
      .find(".dso-input-wrapper + button.dso-tertiary")
      .should("be.visible")
      .should("have.length", 1);
  });

  it("should trap focus when setting the count manually and close with Escape", () => {
    cy.get("dso-list-button")
      .as("dsoListButton")
      .invoke("attr", "count", 8)
      .invoke("attr", "has-input-number", "")
      .shadow()
      .as("dsoListButtonShadow")
      .find(".dso-input-step-counter")
      .realClick()
      .get("@dsoListButtonShadow")
      .find("input.form-control")
      .should("have.focus")
      .realPress("Tab")
      .get("@dsoListButtonShadow")
      .find("input.form-control")
      .should("have.focus")
      .realPress("Escape")
      .get("@dsoListButtonShadow")
      .find(".dso-input-step-counter")
      .should("be.visible");
  });

  it("should emit dsoCountChange", () => {
    cy.get("dso-list-button")
      .as("dsoListButton")
      .invoke("attr", "count", 8)
      .invoke("attr", "has-input-number", "")
      .then(($listButton) => {
        $listButton.on("dsoCountChange", cy.stub().as("dsoCountChangeListener"));
      })
      .shadow()
      .as("dsoListButtonShadow")
      .find(".dso-tertiary")
      .first()
      .click()
      .get("@dsoCountChangeListener")
      .invoke("getCalls")
      .invoke("at", -1)
      .its("args.0.detail.count")
      .should("equal", 7)
      .get("@dsoListButtonShadow")
      .find(".dso-tertiary")
      .last()
      .click()
      .get("@dsoCountChangeListener")
      .invoke("getCalls")
      .invoke("at", -1)
      .its("args.0.detail.count")
      .should("equal", 8)
      .get("@dsoListButtonShadow")
      .find(".dso-manual-input-button")
      .click()
      .realType("50{enter}")
      .get("@dsoCountChangeListener")
      .invoke("getCalls")
      .invoke("at", -1)
      .its("args.0.detail.count")
      .should("equal", 50);
  });

  it("should only allow emit changes between min and max", () => {
    cy.get("dso-list-button")
      .as("dsoListButton")
      .invoke("attr", "count", 2)
      .invoke("attr", "has-input-number", "")
      .invoke("attr", "min", 1)
      .invoke("attr", "max", 3)
      .then(($listButton) => {
        $listButton.on("dsoCountChange", cy.stub().as("dsoCountChangeListener"));
      })
      .shadow()
      .as("dsoListButtonShadow")
      .find(".dso-tertiary")
      .first()
      .click()
      .click()
      .get("@dsoCountChangeListener")
      .should("have.been.calledOnce")
      .get("@dsoListButtonShadow")
      .find(".dso-tertiary")
      .last()
      .click()
      .click()
      .click()
      .get("@dsoListButtonShadow")
      .find(".dso-manual-input-button")
      .click()
      .realType("50{enter}")
      .get("@dsoCountChangeListener")
      .should("have.been.calledThrice")
      .invoke("getCalls")
      .invoke("at", -1)
      .its("args.0.detail.count")
      .should("equal", 3);
  });

  it("should emit dsoSelectedChange", () => {
    cy.get("dso-list-button")
      .as("dsoListButton")
      .invoke("attr", "checked", "")
      .get("@dsoListButton")
      .then(($listButton) => {
        $listButton.on("dsoSelectedChange", cy.stub().as("dsoSelectedChangeListener"));
      })
      .shadow()
      .as("dsoListButtonShadow")
      .find(".dso-list-button.dso-selected")
      .should("be.visible")
      .get("@dsoListButtonShadow")
      .find(".dso-list-button")
      .realClick()
      .get("@dsoSelectedChangeListener")
      .should("have.been.calledOnce")
      .invoke("getCalls")
      .invoke("at", -1)
      .its("args.0.detail.checked")
      .should("equal", false)
      .get("@dsoListButtonShadow")
      .find(".dso-list-button.dso-selected")
      .should("not.exist");
  });
});
