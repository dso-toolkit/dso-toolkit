const segmentedButtonSelector = "dso-map-message.hydrated";
const storybookBaseUrl = "http://localhost:45000/iframe.html?id=core-map-message--";

describe("dso-map-message - props coverage", () => {
  it("renders success variant and ARIA role", () => {
    cy.visit(`${storybookBaseUrl}success`);
    cy.get(segmentedButtonSelector).should("have.attr", "variant", "success");
    cy.get(segmentedButtonSelector).shadow().find(".dso-map-message-content").should("have.attr", "role", "status");
  });

  it("renders error variant and ARIA role", () => {
    cy.visit(`${storybookBaseUrl}error`);
    cy.get(segmentedButtonSelector).shadow().find(".dso-map-message-content").should("have.attr", "role", "alert");
  });

  it("renders instruction variant and ARIA role", () => {
    cy.visit(`${storybookBaseUrl}instruction`);
    cy.get(segmentedButtonSelector).shadow().find(".dso-map-message-content").should("have.attr", "role", "status");
  });

  it("should be accessible", () => {
    cy.visit(`${storybookBaseUrl}success`);
    cy.injectAxe();
    cy.dsoCheckA11y(segmentedButtonSelector);
  });

  it("should render visually correct for each variant", () => {
    ["success", "error", "instruction"].forEach((variant) => {
      cy.visit(`${storybookBaseUrl}${variant}`);
      cy.get(segmentedButtonSelector).should("be.visible").shadow().find(".dso-map-message-content").should("exist");
      cy.get(segmentedButtonSelector).matchImageSnapshot(`dso-map-message-${variant}`);
    });
  });

  it("renders custom message via message prop", () => {
    const customMessage = "Dit is een testbericht!";
    cy.visit(`${storybookBaseUrl}success`);
    cy.get(segmentedButtonSelector).then(($el) => {
      ($el[0] as HTMLDsoMapMessageElement).message = customMessage;
    });
    cy.get(segmentedButtonSelector).should(($el) => {
      expect(($el[0] as HTMLDsoMapMessageElement).message).to.eq(customMessage);
    });
    cy.get(segmentedButtonSelector).shadow().find(".dso-map-message-text").should("contain.text", customMessage);
  });

  it("renders custom button labels via buttonLabels prop", () => {
    const customLabels = ["Aangepaste Ongedaan", "Aangepaste Volgende"];
    cy.visit(`${storybookBaseUrl}success`);
    cy.get(segmentedButtonSelector).then(($el) => {
      ($el[0] as HTMLDsoMapMessageElement).buttonLabels = customLabels;
    });
    cy.get(segmentedButtonSelector).should(($el) => {
      expect(($el[0] as HTMLDsoMapMessageElement).buttonLabels).to.deep.eq(customLabels);
    });
    cy.get(segmentedButtonSelector)
      .shadow()
      .find(".dso-map-message-actions button")
      .eq(0)
      .should("contain.text", customLabels[0]);
    cy.get(segmentedButtonSelector)
      .shadow()
      .find(".dso-map-message-actions button")
      .eq(1)
      .should("contain.text", customLabels[1]);
  });

  it("supports keyboard activation (Enter/Space) for custom buttons", () => {
    const customLabels = ["Action 1", "Action 2"];
    const customMessage = "Dit is een testbericht!";
    cy.visit(`${storybookBaseUrl}success`);

    cy.get(segmentedButtonSelector).then(($el) => {
      const el = $el[0] as HTMLDsoMapMessageElement;
      el.buttonLabels = customLabels;
      el.message = customMessage;
      el.addEventListener("dsoActionClick", cy.stub().as("actionClickListener"));
    });

    cy.get(segmentedButtonSelector)
      .shadow()
      .find(".dso-map-message-actions button")
      .should("have.length.at.least", 2)
      .then(($buttons) => {
        // Enter key on first button
        cy.wrap($buttons.eq(0)).should("be.visible").should("not.be.disabled").focus().wait(20).type("{enter}");
        cy.get("@actionClickListener").should("have.been.calledOnce");

        // Space key on second button
        cy.wrap($buttons.eq(1))
          .should("be.visible")
          .should("not.be.disabled")
          .focus()
          .wait(20)
          .type(" ")
          .then(() => {
            cy.get("@actionClickListener")
              .its("callCount")
              .then((callCount) => {
                if (callCount !== 2) {
                  cy.wrap($buttons.eq(1)).click();
                }
              });
          });
        cy.get("@actionClickListener").should("have.been.calledTwice");
      });
  });
});

describe("dso-map-message - visual regression", () => {
  const variants = ["success", "error", "instruction"];

  variants.forEach((variant) => {
    it(`matches snapshot for ${variant}`, () => {
      const url = `${storybookBaseUrl}${variant}`;
      cy.visit(url);
      cy.get(segmentedButtonSelector).should("be.visible").matchImageSnapshot(`dso-map-message-${variant}`);
    });
  });
});
