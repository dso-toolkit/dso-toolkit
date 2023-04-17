describe("Label", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-label--default");
    prepareComponent();
  });

  const defaultLabelText = "Bouwwerken, werken en objecten bouwen";
  function prepareComponent() {
    // Set the min-height so that there is room for the tooltip.
    cy.get("#root").invoke("attr", "style", "min-height: 360px;");

    cy.get("dso-label").invoke("html", defaultLabelText).as("dsoLabel").shadow().as("dsoLabelShadow");
  }

  it("should be able to truncate label", () => {
    cy.percySnapshot();

    cy.get("@dsoLabel")
      .should("have.text", defaultLabelText)
      .invoke("attr", "truncate", "")
      .get("dso-label")
      .then(($element) => $element.wrap('<div style="max-width: 100px">'))      
      .get("@dsoLabelShadow")
      .find(".dso-label-content")
      .should("exist");

    cy.percySnapshot(`${Cypress.currentTest.title} -- truncated`);
  });

  it("should show tooltip on focus", () => {
    cy.get("@dsoLabel")
      .then(($element) => $element.wrap('<div style="max-width: 100px">'))
      .invoke("attr", "truncate", "")
      .invoke("attr", "removable", "")
      .wait(400)
      .get("@dsoLabelShadow")
      .find(".dso-label-content")
      .focus()
      .get("@dsoLabelShadow")
      .find("dso-tooltip")
      .should("not.have.class", "hidden")
      .should("have.text", defaultLabelText)
      .wait(400)
      .realPress("Tab")
      .get("@dsoLabelShadow")
      .find("dso-tooltip")
      .should("have.class", "hidden");
  });

  it("should close tooltip when escape is pressed", () => {
    cy.get("@dsoLabel")
      .then(($element) => $element.wrap('<div style="max-width: 100px">'))
      .get("@dsoLabel")
      .invoke("attr", "truncate", "")
      .wait(400)
      .get("@dsoLabelShadow")
      .find(".dso-label-content")
      .focus()
      .wait(400)
      .get("@dsoLabelShadow")
      .find("dso-tooltip")
      .should("not.have.class", "hidden")
      .get("body")
      .trigger("keydown", { key: "Escape" })
      .get("@dsoLabelShadow")
      .find("dso-tooltip")
      .should("have.class", "hidden");
  });

  it("should have label text on remove button", () => {
    cy.get("@dsoLabel")
      .should("have.text", defaultLabelText)
      .invoke("attr", "removable", "")
      .wait(200)
      .get("@dsoLabelShadow")
      .find("button span.sr-only")
      .should("have.text", `Verwijder: ${defaultLabelText}`);
  });

  it("should update label and remove button text", () => {
    cy.get("@dsoLabel")
      .should("have.text", defaultLabelText)
      .invoke("attr", "removable", "")
      .get("@dsoLabel")
      .invoke("html", "andere tekst")
      .get("@dsoLabel")
      .should("have.text", "andere tekst")
      .get("@dsoLabelShadow")
      .find("button span.sr-only")
      .should("have.text", "Verwijder: andere tekst");
  });

  it.only("should emit removeClick event", () => {
    cy.get("@dsoLabel")
      .then(($element) => $element.on("dsoRemoveClick", cy.stub().as("removeClickListener")))
      .should("have.text", defaultLabelText)
      .invoke("attr", "removable", "")
      .wait(100)
      .get("@dsoLabelShadow")
      .find("button")
      .click()
      .get("@removeClickListener")
      .should("have.been.calledOnce");
  });

  it("Should update tooltip and remove button text when changed", () => {
    const updatedText = "andere tekst";

    cy.get("@dsoLabel")
      .should("have.text", defaultLabelText)
      .invoke("attr", "removable", "")
      .get("@dsoLabelShadow")
      .find("button span.sr-only")
      .should("have.text", `Verwijder: ${defaultLabelText}`)
      .wait(100)
      .get("@dsoLabel")
      .invoke("text", updatedText)
      .wait(100)
      .get("@dsoLabelShadow")
      .find("button span.sr-only")
      .should("have.text", `Verwijder: ${updatedText}`);
  });
});
