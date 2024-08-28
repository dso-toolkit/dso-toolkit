describe("Tabs", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-tabs--default")
      .get("dso-tabs")
      .then(($tabs) => {
        $tabs.on("dsoTabSwitch", cy.stub().as("dsoTabSwitchListener"));
      })
      .shadow()
      .as("dsoTabs");
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.checkA11y("dso-tabs");
  });

  it("matches imageSnapshot", () => {
    cy.get("dso-tabs.hydrated").matchImageSnapshot(`${Cypress.currentTest.title} - default`);

    cy.visit("http://localhost:45000/iframe.html?id=core-tabs--inactief");

    cy.get("dso-tabs.hydrated").matchImageSnapshot(`${Cypress.currentTest.title} - inactief`);
  });

  it("should have the correct attributes", () => {
    const tabs = ["tabitem-1", "tabitem-2", "tabitem-3", "tabitem-4"];

    tabs.forEach((tab, index) => {
      if (index === 0) {
        cy.get("dso-tabs")
          .find("dso-tab")
          .eq(index)
          .should("have.id", `${tab}-tab`)
          .and("have.attr", "aria-labelledby", tab)
          .and("have.prop", "active")
          .get("@dsoTabs")
          .find("ul>li")
          .eq(index)
          .should("have.class", "active")
          .and("have.id", tab)
          .find("> a")
          .should("have.attr", "aria-selected", "true");
      } else {
        cy.get("dso-tabs")
          .find("dso-tab")
          .eq(index)
          .should("have.id", `${tab}-tab`)
          .and("have.attr", "aria-labelledby", tab)
          .and("have.prop", "hidden")
          .get("@dsoTabs")
          .find("ul>li")
          .eq(index)
          .should("have.id", tab)
          .find("> a")
          .should("have.attr", "aria-selected", "false")
          .and("have.attr", "tabindex", "-1");
      }
    });
  });

  it("should call event on mouse click", () => {
    cy.get("@dsoTabs")
      .find("ul>li")
      .eq(2)
      .click()
      .get("@dsoTabSwitchListener")
      .should("have.been.calledOnceWith", Cypress.sinon.match.object)
      .its("firstCall.args.0.detail")
      .should("deep.include", { selected: "tabitem-3" });
  });

  it("should call event on arrow keys", () => {
    cy.get("@dsoTabs")
      .find("ul>li")
      .first()
      .find("a")
      .focus()
      .should("have.focus")
      .realPress("ArrowLeft")
      .get("@dsoTabSwitchListener")
      .should("not.have.been.called")
      .realPress("ArrowRight")
      .get("@dsoTabSwitchListener")
      .should("have.been.calledOnceWith", Cypress.sinon.match.object)
      .its("firstCall.args.0.detail")
      .should("deep.include", { selected: "tabitem-2" });

    cy.get("dso-tabs")
      .find("dso-tab")
      .first()
      .invoke("removeAttr", "active")
      .get("dso-tabs")
      .find("dso-tab")
      .last()
      .invoke("attr", "active", "")
      .get("@dsoTabs")
      .find("ul>li")
      .last()
      .find("a")
      .focus()
      .should("have.focus")
      .realPress("ArrowRight")
      .get("@dsoTabSwitchListener")
      .should("have.been.calledOnce")
      .realPress("ArrowLeft")
      .get("@dsoTabSwitchListener")
      .should("have.been.calledTwice")
      .should("have.been.calledWith", Cypress.sinon.match.object)
      .its("secondCall.args.0.detail")
      .should("deep.include", { selected: "tabitem-3" });
  });
});
