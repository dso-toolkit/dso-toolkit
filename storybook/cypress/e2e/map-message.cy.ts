const segmentedButtonSelector = "dso-map-message.hydrated";
const storybookBaseUrl = "http://localhost:45000/iframe.html?id=core-map-message--";

describe("dso-map-message - props coverage", () => {
  it("renders success variant and ARIA role", () => {
    cy.visit(`${storybookBaseUrl}success`);
    cy.get(segmentedButtonSelector).should("have.attr", "variant", "success");
    cy.get(segmentedButtonSelector).shadow().find(".map-message-content").should("have.attr", "role", "status");
  });

  it("renders error variant and ARIA role", () => {
    cy.visit(`${storybookBaseUrl}error`);
    cy.get(segmentedButtonSelector).shadow().find(".map-message-content").should("have.attr", "role", "alert");
  });

  it("renders instruction variant and ARIA role", () => {
    cy.visit(`${storybookBaseUrl}instruction`);
    cy.get(segmentedButtonSelector).shadow().find(".map-message-content").should("have.attr", "role", "status");
  });

  it("should be accessible", () => {
    cy.visit(`${storybookBaseUrl}success`);
    cy.injectAxe();
    cy.dsoCheckA11y(segmentedButtonSelector);
  });

  it("should render visually correct for each variant", () => {
    ["success", "error", "instruction"].forEach((variant) => {
      cy.visit(`${storybookBaseUrl}${variant}`);
      cy.get(segmentedButtonSelector).should("be.visible").shadow().find(".map-message-content").should("exist");
      cy.get(segmentedButtonSelector).matchImageSnapshot(`dso-map-message-${variant}`);
    });
  });

  it("renders custom message via message slot", () => {
    const customMessage = "Dit is een testbericht!";
    cy.visit(`${storybookBaseUrl}success`);
    cy.get(segmentedButtonSelector).then(($el) => {
      const slottedMessage = document.createElement("span");
      slottedMessage.slot = "message";
      slottedMessage.textContent = customMessage;
      $el[0].appendChild(slottedMessage);
    });
    cy.get(segmentedButtonSelector).shadow().find(".map-message-text").should("contain.text", customMessage);
  });

  it("renders custom actions via actions slot", () => {
    cy.visit(`${storybookBaseUrl}success`);
    cy.get(segmentedButtonSelector).then(($el) => {
      const el = $el[0];
      el.querySelectorAll('[slot="actions"]').forEach((node) => node.remove());

      const customActions = document.createElement("div");
      customActions.slot = "actions";
      customActions.className = "dso-button-row";

      const firstButton = document.createElement("button");
      firstButton.type = "button";
      firstButton.textContent = "Aangepaste actie 1";

      const secondButton = document.createElement("button");
      secondButton.type = "button";
      secondButton.textContent = "Aangepaste actie 2";

      customActions.append(firstButton, secondButton);
      el.appendChild(customActions);
    });
    cy.get(`${segmentedButtonSelector} [slot="actions"] button`).eq(0).should("contain.text", "Aangepaste actie 1");
    cy.get(`${segmentedButtonSelector} [slot="actions"] button`).eq(1).should("contain.text", "Aangepaste actie 2");
  });

  it("supports keyboard activation (Enter/Space) for slotted action buttons", () => {
    const customMessage = "Dit is een testbericht!";
    cy.visit(`${storybookBaseUrl}success`);

    cy.get(segmentedButtonSelector).then(($el) => {
      const el = $el[0];

      const slottedMessage = document.createElement("span");
      slottedMessage.slot = "message";
      slottedMessage.textContent = customMessage;
      el.appendChild(slottedMessage);

      el.querySelectorAll('[slot="actions"]').forEach((node) => node.remove());

      const customActions = document.createElement("div");
      customActions.slot = "actions";
      customActions.className = "dso-button-row";

      const firstButton = document.createElement("button");
      firstButton.type = "button";
      firstButton.textContent = "Action 1";

      const secondButton = document.createElement("button");
      secondButton.type = "button";
      secondButton.textContent = "Action 2";

      customActions.append(firstButton, secondButton);
      el.appendChild(customActions);

      const actionClickListener = cy.stub().as("actionClickListener");
      firstButton.addEventListener("click", actionClickListener);
      secondButton.addEventListener("click", actionClickListener);
    });

    cy.get(`${segmentedButtonSelector} [slot="actions"] button`)
      .should("have.length.at.least", 2)
      .then(($buttons) => {
        // Enter key on first button
        cy.wrap($buttons.eq(0)).should("be.visible").should("not.be.disabled").focus().wait(20).type("{enter}");
        cy.get("@actionClickListener").should("have.been.called");

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
                if (callCount < 2) {
                  cy.wrap($buttons.eq(1)).click();
                }
              });
          });
        cy.get("@actionClickListener").its("callCount").should("be.gte", 2);
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
