const getIframe = (story: string) => cy.visit(`http://localhost:45000/iframe.html?id=${story}`);
const getRadio = (index: number) => cy.get("dso-segmented-button").shadow().find("input[type='radio']").eq(index);

describe("Segmented Button", () => {
  beforeEach(() => {
    getIframe("core-segmented-button--default");
    cy.get("dso-segmented-button").should("exist");
  });

  it("visual snapshot", () => {
    cy.get("dso-segmented-button").matchImageSnapshot("segmented-button");
  });

  it("updates activeOption on click", () => {
    getRadio(1).click({ force: true }).should("be.checked");
  });

  it("emits dsoChange on click", () => {
    const spy = cy.spy().as("dsoChangeSpy");
    cy.get("dso-segmented-button").then(($el) => $el[0].addEventListener("dsoChange", spy));
    getRadio(2).click({ force: true });
    cy.get("@dsoChangeSpy").should("have.been.calledOnce");
  });

  it("sets aria-required when true", () => {
    getIframe("core-segmented-button--default&args=segmentedAriaRequired:true");
    cy.get("dso-segmented-button").shadow().find('div[role="radiogroup"]').should("have.attr", "aria-required", "true");
  });

  it("keyboard navigation: arrow keys move selection", () => {
    getRadio(0).focus().should("be.focused").type("{rightarrow}");
    getRadio(1).should("be.checked").type("{leftarrow}");
    getRadio(0).should("be.checked");
  });
});

describe("Segmented Button - WithDisabledButton story", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-segmented-button--with-disabled-button");
    cy.get("dso-segmented-button").should("exist");
  });

  it("should not activate disabled buttons", () => {
    cy.get("dso-segmented-button")
      .shadow()
      .find("input:disabled")
      .each(($input) => {
        cy.wrap($input).click({ force: true });
        cy.wrap($input).should("be.disabled");
      });
  });
});
