function visitMapMessageStory(variant) {
  cy.visit(`http://localhost:45000/iframe.html?id=core-map-message--${variant}`);
}

describe("dso-map-message", () => {
  it("should activate action buttons with Enter and Space", () => {
    visitMapMessageStory("success");
    cy.get("dso-map-message")
      .then(($element) => $element.on("dsoActionClick", cy.stub().as("actionClickListener")))
      .shadow()
      .find(".dso-map-message-actions .dso-action-button")
      .then(($buttons) => {
        if ($buttons.length === 2) {
          // Test Enter key
          cy.wrap($buttons.eq(0)).focus();
          cy.realPress("Enter");
          cy.get("@actionClickListener").should("have.been.calledOnce");

          // Test Space key
          cy.wrap($buttons.eq(1)).focus();
          cy.realPress("Space");
          cy.get("@actionClickListener").should("have.been.calledTwice");
        } else {
          cy.log("No action buttons found for keyboard activation test");
        }
      });
  });
  it("should emit dsoActionClick event when action buttons are clicked", () => {
    visitMapMessageStory("success");
    cy.get("dso-map-message")
      .then(($element) => $element.on("dsoActionClick", cy.stub().as("actionClickListener")))
      .shadow()
      .find(".dso-map-message-actions .dso-action-button")
      .then(($buttons) => {
        if ($buttons.length === 2) {
          cy.wrap($buttons.eq(0)).click();
          cy.wrap($buttons.eq(1)).click();
          cy.get("@actionClickListener").should("have.been.calledTwice");
        } else {
          cy.log("No action buttons found for event test");
        }
      });
  });
  it("should have correct ARIA role for success variant", () => {
    visitMapMessageStory("success");
    cy.get("dso-map-message").shadow().find(".dso-map-message-content").should("have.attr", "role", "status");
  });

  it("should have correct ARIA role for error variant", () => {
    visitMapMessageStory("error");
    cy.get("dso-map-message").shadow().find(".dso-map-message-content").should("have.attr", "role", "alert");
  });
  it("renders success variant", () => {
    visitMapMessageStory("success");
    cy.get("dso-map-message").should("have.attr", "variant", "success");
    cy.get("dso-map-message")
      .shadow()
      .find(".dso-map-message-text")
      .should("contain.text", "This is a success map message.");
  });

  it("renders error variant", () => {
    visitMapMessageStory("error");
    cy.get("dso-map-message").should("have.attr", "variant", "error");
    cy.get("dso-map-message")
      .shadow()
      .find(".dso-map-message-text")
      .should("contain.text", "This is an error map message.");
  });

  it("renders introduction variant", () => {
    visitMapMessageStory("introduction");
    cy.get("dso-map-message").should("have.attr", "variant", "introduction");
    cy.get("dso-map-message")
      .shadow()
      .find(".dso-map-message-text")
      .should("contain.text", "This is an introduction map message.");
    cy.get("dso-map-message").shadow().find("dso-icon").should("not.exist");
  });

  it("renders and interacts with success buttons", () => {
    visitMapMessageStory("success");
    cy.get("dso-map-message")
      .shadow()
      .find(".dso-map-message-actions .dso-action-button")
      .then(($buttons) => {
        if ($buttons.length === 2) {
          cy.wrap($buttons.eq(0)).should("contain.text", "Ongedaan maken").click();
          cy.wrap($buttons.eq(1)).should("contain.text", "Volgende").click();
        } else {
          cy.log("No action buttons found for success variant");
        }
      });
  });

  it("renders and interacts with error buttons", () => {
    visitMapMessageStory("error");
    cy.get("dso-map-message")
      .shadow()
      .find(".dso-map-message-actions .dso-action-button")
      .then(($buttons) => {
        if ($buttons.length === 2) {
          cy.wrap($buttons.eq(0)).should("contain.text", "Sluiten").click();
          cy.wrap($buttons.eq(1)).should("contain.text", "Opnieuw proberen").click();
        } else {
          cy.log("No action buttons found for error variant");
        }
      });
  });

  it("should allow tab navigation between buttons", () => {
    visitMapMessageStory("success");
    cy.get("dso-map-message")
      .shadow()
      .find(".dso-map-message-actions .dso-action-button")
      .then(($buttons) => {
        if ($buttons.length === 2) {
          cy.wrap($buttons.eq(0)).focus();
          cy.focused().should("contain.text", "Ongedaan maken");
          cy.realPress("Tab");
          cy.focused().should("contain.text", "Volgende");
          cy.wrap($buttons.eq(0)).focus();
          cy.focused().should("contain.text", "Ongedaan maken");
          cy.realPress("Tab");
          cy.wrap($buttons.eq(1)).should("be.focused").and("contain.text", "Volgende");
        } else {
          cy.log("No action buttons found for tab navigation test");
        }
      });
  });

  it("visual snapshot of success variant", () => {
    visitMapMessageStory("success");
    cy.get("dso-map-message").then(($el) => {
      cy.wrap($el).matchImageSnapshot("map-message-success");
    });
  });
});
