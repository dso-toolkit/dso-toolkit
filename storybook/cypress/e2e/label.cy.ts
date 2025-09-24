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

  it("must truncate label", () => {
    cy.get("@dsoLabel").matchImageSnapshot(`${Cypress.currentTest.title} -- before truncation`);

    cy.get("@dsoLabel")
      .should("have.text", defaultLabelText)
      .invoke("prop", "truncate", true)
      .get("@dsoLabelShadow")
      .find(".dso-label")
      .should("not.have.attr", "aria-describedby")
      .get("@dsoLabel")
      .then(($element) => $element.wrap('<div style="max-width: 100px">'))
      .get("@dsoLabel")
      .shadow()
      .find(".dso-label")
      .should("have.attr", "aria-describedby", "toggle-anchor")
      .get("@dsoLabelShadow")
      .find(".dso-label-content.dso-truncate")
      .should("exist");

    cy.get("@dsoLabel").matchImageSnapshot(`${Cypress.currentTest.title} -- after truncation`);
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
      .find("dso-icon-button")
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
      .find("dso-icon-button")
      .shadow()
      .find(`button[aria-label='Verwijder: ${defaultLabelText}']`)
      .get("@dsoLabel")
      .invoke("text", updatedText)
      .get("@dsoLabel")
      .should("have.text", updatedText)
      .get("@dsoLabelShadow")
      .find("dso-icon-button")
      .shadow()
      .find(`button[aria-label='Verwijder: ${updatedText}']`);
  });

  const statusses = [
    undefined,
    "primary",
    "success",
    "info",
    "warning",
    "error",
    "bright",
    "attention",
    "filter",
    "toegevoegd",
    "verwijderd",
  ];

  statusses.map((status) => {
    it(`Label with status "${status}" is accessible`, () => {
      cy.injectAxe();
      cy.dsoCheckA11y("dso-label.hydrated");
    });

    it(`matches snapshots for status "${status}"`, () => {
      cy.get("@dsoLabel").invoke("prop", "status", status);

      cy.get("@dsoLabel").matchImageSnapshot();
    });
  });
});
