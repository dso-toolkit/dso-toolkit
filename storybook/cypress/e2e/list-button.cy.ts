describe("ListButton", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-list-button--single-select");
  });

  it("should render label and sublabel correctly", () => {
    cy.get("dso-list-button.hydrated")
      .as("dsoListButton")
      .get("@dsoListButton")
      .should("be.visible")
      .shadow()
      .as("dsoListButtonShadow")
      .find(".dso-selectable-input-wrapper > label")
      .should("contain.text", "Milieubelastende activiteit - Melding")
      .get("@dsoListButtonShadow")
      .find(".dso-input-number")
      .should("not.exist")
      .get("@dsoListButtonShadow")
      .find(".dso-sublabel")
      .should("not.exist")
      .get("@dsoListButton")
      .invoke("attr", "sublabel", "Sublabel")
      .get("@dsoListButtonShadow")
      .find(".dso-sublabel")
      .should("contain.text", "Sublabel")
      .get("@dsoListButton")
      .then(($listButton) => {
        $listButton.append('<span slot="subcontent">Subcontent</span>');
      })
      .get("@dsoListButtonShadow")
      .find(".dso-selectable-input-wrapper > label")
      .should(
        "contain.html",
        'Milieubelastende activiteit - Melding<span class="sr-only"> Sublabel</span><span class="sr-only"> <span>Subcontent</span></span>',
      )
      .get("@dsoListButton")
      .find('> [slot="subcontent"]')
      .should("have.attr", "aria-hidden", "true")
      .get("@dsoListButton")
      .matchImageSnapshot();
  });

  it("should render subcontent in slot without prefix", () => {
    cy.get("dso-list-button").invoke("append", `<span slot="subcontent">Subcontent met <strong>HTML</strong></span>`);

    cy.get("dso-list-button.hydrated")
      .shadow()
      .find('slot[name="subcontent"]')
      .invoke("get", 0)
      .invoke("assignedNodes")
      .then((assignedNodes) => {
        cy.get('dso-list-button > [slot="subcontent"]').invoke("get", 0).should("equal", assignedNodes[0]);
      });

    cy.get("dso-list-button")
      .shadow()
      .as("dsoListButtonShadow")
      .find(".dso-selectable-input-wrapper > label > .sr-only")
      .should("contain.html", "<span>Subcontent met <strong>HTML</strong></span>")
      .get("dso-list-button.hydrated")
      .matchImageSnapshot();
  });

  it("should render subcontent in slot with prefix", () => {
    cy.get("dso-list-button")
      .invoke("append", `<span slot="subcontent">Subcontent met <strong>HTML</strong></span>`)
      .get("dso-list-button")
      .invoke("prop", "subcontentPrefix", "subcontentPrefix")
      .shadow()
      .find(".dso-selectable-input-wrapper > label")
      .should(
        "contain.html",
        'Milieubelastende activiteit - Melding<span class="sr-only">subcontentPrefix: <span>Subcontent met <strong>HTML</strong></span></span>',
      );
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.dsoCheckA11y("dso-list-button.hydrated");
  });

  it("should render the interactive count input", () => {
    cy.get("dso-list-button")
      .as("dsoListButton")
      .invoke("attr", "count", 8)
      .shadow()
      .as("dsoListButtonShadow")
      .find(".dso-input-step-counter")
      .should("be.visible")
      .should("have.text", 8)
      .get("@dsoListButtonShadow")
      .find(".dso-input-number button.dso-tertiary")
      .should("have.length", 2);
  });

  it("should hide the minus button when count is 1", () => {
    cy.get("dso-list-button")
      .as("dsoListButton")
      .invoke("attr", "count", 1)
      .shadow()
      .as("dsoListButtonShadow")
      .get("@dsoListButtonShadow")
      .find(".dso-input-number button.dso-tertiary")
      .should("have.length", 1);
  });

  it("should emit dsoCountChange", () => {
    cy.get("dso-list-button.hydrated")
      .as("dsoListButton")
      .invoke("attr", "count", 8)
      .get("dso-list-button")
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
      .should("equal", 8);
  });

  it("should only allow emit changes between min and max", () => {
    cy.get("dso-list-button")
      .as("dsoListButton")
      .invoke("attr", "count", 2)
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
      .should("be.disabled");
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
});
