describe("Label", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-label--default");
    prepareComponent();
  });

  const defaultLabelText = "Bouwwerken, werken en objecten bouwen";
  function prepareComponent() {
    // Set the min-height so that there is room for the tooltip.
    cy.get("#storybook-root").invoke("attr", "style", "min-height: 360px;");

    cy.get("dso-label.hydrated")
      .as("dsoLabel")
      .shadow()
      .as("dsoLabelShadow")
      .get("@dsoLabel")
      .invoke("text", defaultLabelText);
  }

  it("should be accessible", () => {
    cy.injectAxe();
    cy.checkA11y("dso-label");
  });

  it("should be able to truncate label", () => {
    cy.get("@dsoLabel").matchImageSnapshot();

    cy.get("@dsoLabel")
      .should("have.text", defaultLabelText)
      .invoke("prop", "truncate", true)
      .get("dso-label")
      .should("not.have.attr", "aria-roledescription")
      .get("dso-label")
      .then(($element) => $element.wrap('<div style="max-width: 100px">'))
      .get("@dsoLabelShadow")
      .find(".dso-label-content")
      .should("exist");

    cy.get("@dsoLabel").matchImageSnapshot(`${Cypress.currentTest.title} -- truncated`);
  });

  it("should show tooltip on focus", () => {
    cy.get("@dsoLabel")
      .then(($element) => $element.wrap('<div style="max-width: 100px">'))
      .invoke("prop", "truncate", true)
      .invoke("prop", "removable", true)
      .get("@dsoLabelShadow")
      .find(".dso-label-content")
      .should("have.attr", "tabindex", "0")
      .focus()
      .get("@dsoLabelShadow")
      .find("dso-tooltip")
      .should("not.have.class", "hidden")
      .should("have.text", defaultLabelText)
      .realPress("Tab")
      .get("@dsoLabelShadow")
      .find("dso-tooltip")
      .should("have.class", "hidden");
  });

  it("should close tooltip when escape is pressed", () => {
    cy.get("@dsoLabel")
      .then(($element) => $element.wrap('<div style="max-width: 100px">'))
      .get("@dsoLabel")
      .invoke("prop", "truncate", true)
      .get("@dsoLabelShadow")
      .find(".dso-label-content")
      .should("have.attr", "tabindex", "0")
      .focus()
      .get("@dsoLabelShadow")
      .find("dso-tooltip")
      .should("not.have.class", "hidden")
      .get("body")
      .trigger("keydown", { key: "Escape" })
      .get("@dsoLabelShadow")
      .find("dso-tooltip")
      .should("have.class", "hidden");
  });

  it("should emit removeClick event", () => {
    cy.get("@dsoLabel")
      .then(($element) => $element.on("dsoRemoveClick", cy.stub().as("removeClickListener")))
      .should("have.text", defaultLabelText)
      .invoke("prop", "removable", true)
      .get("@dsoLabelShadow")
      .find("button")
      .click()
      .get("@removeClickListener")
      .should("have.been.calledOnce");
  });

  it("Should update label and remove-button text when changed", () => {
    const updatedText = "andere tekst";

    cy.get("@dsoLabel")
      .should("have.text", defaultLabelText)
      .invoke("prop", "removable", true)
      .get("@dsoLabelShadow")
      .find("button span.sr-only")
      .should("have.text", `Verwijder: ${defaultLabelText}`)
      .get("@dsoLabel")
      .invoke("text", updatedText)
      .get("@dsoLabel")
      .should("have.text", updatedText)
      .get("@dsoLabelShadow")
      .find("button span.sr-only")
      .should("have.text", `Verwijder: ${updatedText}`);
  });
});
