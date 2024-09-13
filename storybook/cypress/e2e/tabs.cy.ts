describe("Tabs", () => {
  const stories = ["as-anchors", "as-anchors-disabled", "as-buttons", "as-buttons-disabled"];
  for (const story of stories) {
    it(`should be accessible (${story})`, () => {
      cy.visit(`http://localhost:45000/iframe.html?id=core-tabs--${story}`);
      cy.injectAxe();
      // Todo: dsoCheckA11y met .hydrated
      cy.checkA11y("dso-tabs");
    });

    it(`matches imageSnapshot (${story})`, () => {
      cy.visit(`http://localhost:45000/iframe.html?id=core-tabs--${story}`);
      cy.get("dso-tabs.hydrated").matchImageSnapshot(`${Cypress.currentTest.title} - ${story}`);
    });
  }
});

describe("Tabs - anchors", () => {
  beforeEach(() => {
    cy.visit(`http://localhost:45000/iframe.html?id=core-tabs--as-anchors`)
      .get("dso-tabs")
      .find("dso-tab")
      .each(($tab) => {
        $tab.on("dsoTabSwitch", cy.stub().as(`dsoTabSwitchListener${$tab.attr("identifier")}`));
      });
  });

  it("should have the correct attributes", () => {
    const tabs = ["tabitem-1", "tabitem-2", "tabitem-3", "tabitem-4"];

    tabs.forEach((tab, index) => {
      if (index === 0) {
        cy.get("dso-tabs")
          .find("dso-tab")
          .as("dsoTab")
          .eq(index)
          .should("have.attr", "identifier", `${tab}`)
          .and("have.class", "active")
          .and("have.prop", "active")
          .get("@dsoTab")
          .eq(index)
          .shadow()
          .find("a")
          .should("have.attr", "aria-selected", "true")
          .and("have.attr", "aria-controls", tab)
          .and("have.id", `${tab}-tab`)
          .and("not.have.attr", "tabindex");
      } else {
        cy.get("dso-tabs")
          .find("dso-tab")
          .as("dsoTab")
          .eq(index)
          .should("have.attr", "identifier", `${tab}`)
          .and("not.have.class", "active")
          .and("not.have.prop", "active")
          .get("@dsoTab")
          .eq(index)
          .shadow()
          .find("a")
          .should("have.attr", "aria-selected", "false")
          .and("have.attr", "aria-controls", tab)
          .and("have.id", `${tab}-tab`)
          .and("have.attr", "tabindex", "-1");
      }
    });
  });

  // TODO: luisteren naar @dsoTabSwitchListener al dan niet per dso-tab met identifier
  xit("should call event on mouse click", () => {
    cy.get("dso-tabs")
      .find("dso-tab:nth-child(2)")
      .shadow()
      .find("a")
      .click()
      .get("@dsoTabSwitchListenertabitem-2")
      .should("be.calledOnce");
  });

  // TODO
  xit("should place focus to next and previous tabs with arrow keys", () => {
    cy.get("dso-tabs")
      .find("dso-tab")
      .first()
      .shadow()
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

// TODO: deze uitwerken tbv ArrowLeft en ArrowRight dat de focus over disabled anchors heen springt
xdescribe("Tabs - anchors disabled", () => {
  beforeEach(() => {
    cy.visit(`http://localhost:45000/iframe.html?id=core-tabs--as-anchors-disabled`);
  });

  xit("should have the correct attributes", () => {
    const tabs = ["tabitem-1", "tabitem-2", "tabitem-3", "tabitem-4"];

    tabs.forEach((tab, index) => {
      if (index === 0) {
        cy.get("dso-tabs")
          .find("dso-tab")
          .as("dsoTab")
          .eq(index)
          .should("have.attr", "identifier", `${tab}`)
          .and("have.class", "active")
          .and("have.prop", "active")
          .get("@dsoTab")
          .eq(index)
          .shadow()
          .find("a")
          .should("have.attr", "aria-selected", "true")
          .and("have.attr", "aria-controls", tab)
          .and("have.id", `${tab}-tab`)
          .and("not.have.attr", "tabindex");
      } else {
        cy.get("dso-tabs")
          .find("dso-tab")
          .as("dsoTab")
          .eq(index)
          .should("have.attr", "identifier", `${tab}`)
          .and("not.have.class", "active")
          .and("not.have.prop", "active")
          .get("@dsoTab")
          .eq(index)
          .shadow()
          .find("a")
          .should("have.attr", "aria-selected", "false")
          .and("have.attr", "aria-controls", tab)
          .and("have.id", `${tab}-tab`)
          .and("have.attr", "tabindex", "-1");
      }
    });
  });

  // Todo: nog werkend maken
  xit("should call event on mouse click", () => {
    cy.get("dso-tabs")
      .find("dso-tab:nth-child(2)")
      .then(($tab) => {
        $tab.on("dsoTabSwitch", cy.stub().as("dsoTabSwitchListener"));
      })
      .shadow()
      .find("a")
      .click()
      .get("@dsoTabSwitchListener")
      .should("be.calledOnce");
  });

  xit("should place focus to next and previous tabs with arrow keys", () => {
    cy.get("dso-tabs")
      .find("dso-tab")
      .first()
      .shadow()
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
// TODO: deze uitwerken , zal nagenoeg identiek zijn aan anchors
xdescribe("Tabs - buttons", () => {
  beforeEach(() => {
    cy.visit(`http://localhost:45000/iframe.html?id=core-tabs--as-buttons`);
  });

  it("should have the correct attributes", () => {
    const tabs = ["tabitem-1", "tabitem-2", "tabitem-3", "tabitem-4"];

    tabs.forEach((tab, index) => {
      if (index === 2) {
        cy.get("dso-tabs")
          .find("dso-tab")
          .as("dsoTab")
          .eq(index)
          .should("have.attr", "identifier", `${tab}`)
          .and("have.class", "active")
          .and("have.prop", "active")
          .get("@dsoTab")
          .eq(index)
          .shadow()
          .find("button")
          .should("have.attr", "aria-selected", "true")
          .and("have.attr", "aria-controls", tab)
          .and("have.id", `${tab}-tab`)
          .and("not.have.attr", "tabindex");
      } else {
        cy.get("dso-tabs")
          .find("dso-tab")
          .as("dsoTab")
          .eq(index)
          .should("have.attr", "identifier", `${tab}`)
          .and("not.have.class", "active")
          .and("not.have.prop", "active")
          .get("@dsoTab")
          .eq(index)
          .shadow()
          .find("button")
          .should("have.attr", "aria-selected", "false")
          .and("have.attr", "aria-controls", tab)
          .and("have.id", `${tab}-tab`)
          .and("have.attr", "tabindex", "-1");
      }
    });
  });

  // Todo: nog werkend maken
  xit("should call event on mouse click", () => {
    cy.get("dso-tabs")
      .find("dso-tab:nth-child(2)")
      .then(($tab) => {
        $tab.on("dsoTabSwitch", cy.stub().as("dsoTabSwitchListener"));
      })
      .shadow()
      .find("a")
      .click()
      .get("@dsoTabSwitchListener")
      .should("be.calledOnce");
  });

  xit("should place focus to next and previous tabs with arrow keys", () => {
    cy.get("dso-tabs")
      .find("dso-tab")
      .first()
      .shadow()
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
// TODO: Tabs - button disabled uitwerken, zal nagenoeg identiek zijn aan anchors disabled
