describe("Input Range Extern Label", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=patronen-input-range-extern-label--extern-label");
  });

  it("supports an external label as a form-associated custom element", () => {
    cy.get("dso-input-range.hydrated").then(($inputRange) => {
      const inputRange = $inputRange[0] as HTMLInputElement & { internals?: ElementInternals };

      expect(inputRange.internals?.labels?.item(0)?.textContent).to.equal("Transparantie");

      const inputRangeClick = cy.spy().as("inputRangeClick");

      inputRange.addEventListener("click", inputRangeClick);
    });

    cy.get("label[for='input-range-transparantie']").realClick();

    cy.get("@inputRangeClick").should("have.been.calledOnce");

    cy.get<HTMLFormElement>("#test-form").then(($form) => {
      expect(new FormData($form[0]).get("transparantie")).to.equal("50");
    });
  });
});
