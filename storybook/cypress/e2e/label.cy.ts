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

  it("should show tooltip on focus", () => {
    cy.get("@dsoLabel")
      .then(($element) => $element.wrap('<div style="max-width: 100px">'))
      .invoke("prop", "truncate", true)
      .invoke("prop", "removable", true);

    cy.get("@dsoLabelShadow").find("dso-truncate").shadow().as("dsoTruncateShadow");

    cy.get("@dsoTruncateShadow").find(".dso-truncate-content").should("have.attr", "tabindex", "0").focus();

    cy.get("@dsoTruncateShadow").find(".dso-tooltip").should("be.visible").and("have.text", defaultLabelText);

    cy.get("@dsoTruncateShadow").find(".dso-truncate-content").realPress("Tab");

    cy.get("@dsoTruncateShadow").find(".dso-tooltip").should("not.be.visible");
  });

  it("should close tooltip when escape is pressed", () => {
    cy.get("@dsoLabel")
      .then(($element) => $element.wrap('<div style="max-width: 100px">'))
      .invoke("prop", "truncate", true);

    cy.get("@dsoLabelShadow")
      .find("dso-truncate")
      .shadow()
      .find(".dso-truncate-content")
      .should("have.attr", "tabindex", "0")
      .focus();

    cy.get("@dsoLabelShadow").find("dso-truncate").shadow().find(".dso-tooltip").should("be.visible");

    cy.get("body").trigger("keydown", { key: "Escape" });

    cy.get("@dsoLabelShadow").find("dso-truncate").shadow().find(".dso-tooltip").should("not.be.visible");
  });

  it("should emit removeClick event", () => {
    cy.get("@dsoLabel").then(($element) => {
      $element.on("dsoRemoveClick", cy.stub().as("removeClickListener"));
    });

    cy.get("@dsoLabel").should("have.text", defaultLabelText).invoke("prop", "removable", true);

    cy.get("@dsoLabelShadow").find("dso-icon-button").click();

    cy.get("@removeClickListener").should("have.been.calledOnce");
  });

  it("should update label and remove-button text when changed", () => {
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

  const statuses = [
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

  statuses.forEach((status) => {
    it(`Label with status "${status}" is accessible`, () => {
      cy.injectAxe();
      cy.dsoCheckA11y("dso-label.hydrated");
    });

    it(`matches snapshots for status "${status}"`, () => {
      cy.get("@dsoLabel").invoke("attr", "status", status);
      cy.get("@dsoLabel").matchImageSnapshot();
    });
  });
});
