describe("Legend", () => {
  describe("Legenda", () => {
    beforeEach(() => {
      cy.visit("http://localhost:45000/iframe.html?id=core-legend--legenda");
      cy.get("dso-legend.hydrated").as("dsoLegend").shadow().as("dsoLegendShadow");
    });

    it("should be accessible", () => {
      cy.injectAxe();
      cy.dsoCheckA11y("dso-legend.hydrated");
    });

    it("should show the topbar and a close icon button", () => {
      cy.get("@dsoLegendShadow").find(".tab").should("include.text", "Legenda").should("have.class", "active");
      cy.get("@dsoLegendShadow").find(".close-button");

      cy.get("@dsoLegend").matchImageSnapshot(`${Cypress.currentTest.title}`);
    });

    it("should emit the dsoContentSwitch event when clicked on a topbar tab item", () => {
      cy.get("@dsoLegend")
        .then(($element) => $element.on("dsoContentSwitch", cy.stub().as("dsoContentSwitchListener")))
        .get("@dsoLegendShadow")
        .find(".tab:not(.active)")
        .click()
        .get("@dsoContentSwitchListener")
        .should("have.been.calledOnce");
    });

    it("should not emit the dsoContentSwitch event when clicked on a topbar active tab item", () => {
      cy.get("@dsoLegend")
        .then(($element) => $element.on("dsoContentSwitch", cy.stub().as("dsoContentSwitchListener")))
        .get("@dsoLegendShadow")
        .find(".tab.active")
        .click()
        .get("@dsoContentSwitchListener")
        .should("not.have.been.calledOnce");
    });

    it("should emit the dsoClose event when clicked on a close icon button", () => {
      cy.get("@dsoLegend")
        .then(($element) => $element.on("dsoClose", cy.stub().as("dsoCloseListener")))
        .get("@dsoLegendShadow")
        .find(".close-button")
        .click()
        .get("@dsoCloseListener")
        .should("have.been.calledOnce");
    });

    it("should place focus to next and previous tabs with arrow keys", () => {
      cy.get("@dsoLegendShadow").find(".tab:nth-child(1)").focus();

      cy.realPress("ArrowRight");

      cy.get("@dsoLegendShadow").find(".tab:nth-child(2)").should("have.focus");

      cy.realPress("ArrowLeft");

      cy.get("@dsoLegendShadow").find(".tab:nth-child(1)").should("have.focus");
    });

    it("should show all legend items in view mode", () => {
      cy.get("@dsoLegendShadow").find(".content").invoke("css", "max-block-size", "none");
      cy.get("@dsoLegend").matchImageSnapshot("legend view mode", { failureThreshold: 0.001 });
    });

    it("should show all legend items in edit mode", () => {
      cy.visit("http://localhost:45000/iframe.html?id=core-legend--legenda&args=mode:edit");
      cy.get("dso-legend.hydrated").as("dsoLegend").shadow().as("dsoLegendShadow");
      cy.get("@dsoLegendShadow").find(".content").invoke("css", "max-block-size", "none");
      cy.get("@dsoLegend").matchImageSnapshot("legend edit mode", { failureThreshold: 0.001 });
    });

    it("should emit dsoLegendGroupModeChange event when clicking the edit button on a legend group", () => {
      cy.get("@dsoLegend")
        .contains("dso-legend-group", "Geselecteerde kenmerken")
        .then(($element) => $element.on("dsoLegendGroupModeChange", cy.stub().as("dsoLegendGroupModeChangeListener")))
        .shadow()
        .find("dso-icon-button")
        .shadow()
        .find("button")
        .click();

      cy.get("@dsoLegendGroupModeChangeListener").should("have.been.calledOnce");
    });

    describe("Legend Item", () => {
      it("should show label and symbol", () => {
        cy.get("@dsoLegend")
          .contains("dso-legend-item", "Document")
          .should("include.text", "Document")
          .shadow()
          .find(".legend-item")
          .should("have.class", "legend-item-symbol");
      });

      it("shows a Slide Toggle with accessible label", () => {
        cy.get("@dsoLegend")
          .contains("dso-legend-item", "Acculader in werking")
          .shadow()
          .find("dso-slide-toggle button")
          .should("have.attr", "aria-label", "Maak acculader in werking actief");
      });

      it("should emit dsoActiveChange event", () => {
        cy.get("@dsoLegend")
          .contains("dso-legend-item", "Acculader in werking")
          .then(($element) => $element.on("dsoActiveChange", cy.stub().as("activeChangeListener")))
          .shadow()
          .find("dso-slide-toggle")
          .click();

        cy.get("@activeChangeListener").should("have.been.calledOnce");
      });

      it("should show an active Slide Toggle", () => {
        cy.get("@dsoLegend")
          .contains("dso-legend-item", "Bomen kappen")
          .shadow()
          .find("dso-slide-toggle button")
          .should("have.attr", "aria-checked", "true");
      });

      it("should not show an options-button when no options slot is provided", () => {
        cy.get("@dsoLegend")
          .contains("dso-legend-item", "Acculader in werking")
          .shadow()
          .find("#options-button")
          .should("not.exist");
      });

      it("should show delete button in edit mode", () => {
        cy.visit("http://localhost:45000/iframe.html?id=core-legend--legenda&args=mode:edit");
        cy.get("dso-legend.hydrated")
          .contains("dso-legend-item", "Acculader in werking")
          .shadow()
          .find("#delete-button")
          .should("exist");
      });

      it("should not show slide-toggle in edit mode", () => {
        cy.visit("http://localhost:45000/iframe.html?id=core-legend--legenda&args=mode:edit");
        cy.get("dso-legend.hydrated")
          .contains("dso-legend-item", "Acculader in werking")
          .shadow()
          .find("dso-slide-toggle")
          .should("not.exist");
      });

      it("should emit dsoDelete event when delete button is clicked in edit mode", () => {
        cy.visit("http://localhost:45000/iframe.html?id=core-legend--legenda&args=mode:edit");
        cy.get("dso-legend.hydrated")
          .contains("dso-legend-item", "Acculader in werking")
          .then(($element) => $element.on("dsoDelete", cy.stub().as("dsoDeleteListener")));

        cy.get("dso-legend.hydrated")
          .contains("dso-legend-item", "Acculader in werking")
          .shadow()
          .find("#delete-button")
          .shadow()
          .find("button")
          .click();

        cy.get("@dsoDeleteListener").should("have.been.calledOnce");
      });
    });
  });

  describe("Kaartlagen", () => {
    beforeEach(() => {
      cy.visit("http://localhost:45000/iframe.html?id=core-legend--kaartlagen");
      cy.get("dso-legend.hydrated").as("dsoLegend").shadow().as("dsoLegendShadow");
    });

    it("should be accessible", () => {
      cy.injectAxe();
      cy.dsoCheckA11y("dso-legend.hydrated");
    });

    it("should show the Kaartlagen tab as active", () => {
      cy.get("@dsoLegendShadow").find(".tab.active").should("include.text", "Kaartlagen");
    });

    it("should show all kaartlagen items", () => {
      cy.get("@dsoLegendShadow").find(".content").invoke("css", "max-block-size", "none");
      cy.get("@dsoLegend").matchImageSnapshot("kaartlagen view mode", { failureThreshold: 0.001 });
    });

    it("should show the options-button when the slider is active", () => {
      cy.get("@dsoLegend")
        .contains("dso-legend-item", "Provinciegrenzen")
        .shadow()
        .find("#options-button")
        .should("be.visible");
    });

    it("should hide the options-button when the slider is not active", () => {
      cy.get("@dsoLegend")
        .contains("dso-legend-item", "Provinciegrenzen")
        .invoke("prop", "active", false)
        .shadow()
        .find("#options-button")
        .should("not.exist");
    });

    it("should toggle options visibility when clicking the options-button", () => {
      cy.get("@dsoLegend").contains("dso-legend-item", "Provinciegrenzen").as("dsoLegendItem");

      cy.get("@dsoLegendItem").shadow().find("div.options").should("have.attr", "hidden");

      cy.get("@dsoLegendItem").shadow().find("#options-button").shadow().find("button").click({ force: true });
      cy.get("@dsoLegendItem").shadow().find("div.options").should("not.have.attr", "hidden");

      cy.get("@dsoLegendItem").shadow().find("#options-button").shadow().find("button").click({ force: true });
      cy.get("@dsoLegendItem").shadow().find("div.options").should("have.attr", "hidden");
    });

    it("should show a scrollbar when the content in the slot is heigher than 600px", () => {
      cy.get("@dsoLegend")
        .contains("dso-legend-item", "Provinciegrenzen")
        .shadow()
        .find("dso-icon-button")
        .shadow()
        .find("button")
        .click({ force: true });
      cy.get("@dsoLegend")
        .contains("dso-legend-item", "Provinciegrenzen")
        .shadow()
        .find("div.options")
        .should("not.have.attr", "hidden");

      cy.get("@dsoLegend")
        .contains("dso-legend-item", "Landgrenzen")
        .shadow()
        .find("dso-icon-button")
        .shadow()
        .find("button")
        .click({ force: true });
      cy.get("@dsoLegend")
        .contains("dso-legend-item", "Landgrenzen")
        .shadow()
        .find("div.options")
        .should("not.have.attr", "hidden");

      cy.get("@dsoLegend")
        .contains("dso-legend-item", "Topgrafie (BRT)")
        .scrollIntoView()
        .shadow()
        .find("dso-icon-button")
        .shadow()
        .find("button")
        .click({ force: true });
      cy.get("@dsoLegend")
        .contains("dso-legend-item", "Topgrafie (BRT)")
        .shadow()
        .find("div.options")
        .should("not.have.attr", "hidden");

      cy.get("@dsoLegend").matchImageSnapshot(`${Cypress.currentTest.title}`);
    });
  });
});
