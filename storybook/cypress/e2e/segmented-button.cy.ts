const segmentedButtonSelector = "dso-segmented-button.hydrated";
const radioInputSelector = "input[type='radio']";
const radioGroupSelector = 'div[role="radiogroup"]';
const getIframe = (story: string) => cy.visit(`http://localhost:45000/iframe.html?id=${story}`);

const attachDsoChangeListener = () =>
  cy.get("@segmentedButton").then(($segmentedButton) => {
    $segmentedButton.on("dsoChange", cy.stub().as("dsoChangeListener"));
  });

describe("Segmented Button", () => {
  beforeEach(() => {
    getIframe("core-segmented-button--default");

    cy.get(segmentedButtonSelector).as("segmentedButton").should("exist").shadow().as("segmentedButtonShadow");
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.dsoCheckA11y(segmentedButtonSelector);
  });

  it("visual snapshot", () => {
    cy.get("@segmentedButton").matchImageSnapshot("segmented-button");
  });

  it("updates activeOption on click", () => {
    cy.get("@segmentedButtonShadow").within(() => {
      cy.get(".segment-label").eq(1).click();
      cy.get(radioInputSelector).eq(1).should("be.checked");
    });
  });

  it("emits dsoChange on click", () => {
    attachDsoChangeListener();

    cy.get("@segmentedButtonShadow").find(".segment-label").eq(2).click();

    cy.get("@dsoChangeListener")
      .should("have.been.calledOnce")
      .invoke("getCalls")
      .invoke("at", -1)
      .its("args.0.detail.option")
      .should("deep.equal", { label: "Button 3" });
  });

  it("updates aria-required when prop set as required", () => {
    cy.get("@segmentedButton").invoke("prop", "required", false).should("have.prop", "required", false);

    cy.get("@segmentedButtonShadow").find(radioGroupSelector).should("not.have.attr", "aria-required");

    cy.get("@segmentedButton").invoke("prop", "required", true).should("have.prop", "required", true);

    cy.get("@segmentedButtonShadow").find(radioGroupSelector).should("have.attr", "aria-required", "true");
  });
});

describe("Segmented Button - WithDisabledButton story", () => {
  beforeEach(() => {
    getIframe("core-segmented-button--with-disabled-button");

    cy.get(segmentedButtonSelector).as("segmentedButton").should("exist").shadow().as("segmentedButtonShadow");
  });

  it("visual snapshot for disabled buttons", () => {
    cy.get("@segmentedButton").matchImageSnapshot("segmented-button-disabled");
  });

  it("should not activate disabled buttons", () => {
    attachDsoChangeListener();

    const options = [
      { label: "Button 1" },
      { label: "Button 2", disabled: true },
      { label: "Button 3" },
      { label: "Button 4" },
    ];

    cy.get("@segmentedButton").invoke("prop", "options", options);
    cy.get("@segmentedButton").invoke("prop", "activeOption", options[0]);

    cy.get("@segmentedButtonShadow").within(() => {
      cy.get(radioInputSelector).eq(0).should("be.checked");

      cy.get(radioInputSelector).eq(1).should("be.disabled").and("not.be.checked");

      cy.get(".segment-label").eq(1).click({ force: true });

      cy.get(radioInputSelector).eq(0).should("be.checked");

      cy.get(radioInputSelector).eq(1).should("not.be.checked");
    });

    cy.get("@dsoChangeListener").should("not.have.been.called");
  });
});
