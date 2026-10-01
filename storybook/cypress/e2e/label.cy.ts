describe("Label", () => {
  const defaultLabelText = "Bouwwerken, werken en objecten bouwen";

  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-label--default");

    cy.get("#storybook-root").invoke("attr", "style", "min-height: 360px;");

    cy.get("dso-label.hydrated").as("dsoLabel").invoke("text", defaultLabelText).shadow().as("dsoLabelShadow");
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
      .find(".dso-tooltip")
      .should("be.visible")
      .should("have.text", defaultLabelText)
      .realPress("Tab")
      .get("@dsoLabelShadow")
      .find(".dso-tooltip")
      .should("not.be.visible");
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

    cy.get("@dsoLabel").should("have.text", defaultLabelText).invoke("prop", "removable", true);

    cy.get("@dsoLabelShadow")
      .find("dso-icon-button")
      .shadow()
      .find(`button[aria-label='Verwijder: ${defaultLabelText}']`)
      .should("exist");

    cy.get("@dsoLabel").invoke("text", updatedText).should("have.text", updatedText);

    cy.get("@dsoLabelShadow")
      .find("dso-icon-button")
      .shadow()
      .find(`button[aria-label='Verwijder: ${updatedText}']`)
      .should("exist");
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
