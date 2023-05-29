describe("ListButton", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-list-button--single-select");
  });

  it("should render label and sublabel correctly", () => {
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
      .should("not.exist")
      .get("@dsoListButton")
      .invoke("attr", "sublabel", "Sublabel")
      .get("@dsoListButtonShadow")
      .find(".dso-sublabel")
      .should("contain.text", "Sublabel")
      .get("@dsoListButtonShadow");
  });

  it("should render subcontent in slot", () => {
    cy.get("dso-list-button").invoke("append", `<span slot="subcontent">Subcontent met <strong>HTML</strong></span>`);

    cy.get("dso-list-button")
      .shadow()
      .find('slot[name="subcontent"]')
      .invoke("get", 0)
      .invoke("assignedNodes")
      .then((assignedNodes) => {
        cy.get('dso-list-button > [slot="subcontent"]').invoke("get", 0).should("equal", assignedNodes[0]);
      })
      .percySnapshot();
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.checkA11y("dso-list-button");
  });

  it("should render the interactive count input", () => {
    cy.get("dso-list-button")
      .as("dsoListButton")
      .invoke("attr", "count", 8)
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
      .find(".dso-manual-input-button")
      .click()
      .wait(50)
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
      .get("@dsoCountChangeListener")
      .should("have.been.calledOnce")
      .get("@dsoListButtonShadow")
      .find(".dso-tertiary")
      .last()
      .click()
      .click()
      .should("be.disabled")
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

  it("should disable manual input when manual is false", () => {
    cy.get("dso-list-button")
      .invoke("attr", "count", 5)
      .invoke("attr", "manual", "false")
      .shadow()
      .find(".dso-manual-input-button")
      .should("not.exist");
  });

  it("should cancel manual input when manual is set to false during manual input", () => {
    cy.get("dso-list-button")
      .invoke("attr", "count", 5)
      .shadow()
      .find(".dso-manual-input-button")
      .click()
      .get("dso-list-button")
      .shadow()
      .find('input[type="number"]:not([readonly])')
      .as("manualInputField")
      .should("not.have.class", "hidden")
      .get("dso-list-button")
      .invoke("attr", "manual", "false")
      .get("@manualInputField")
      .should("have.class", "hidden");
  });
});
