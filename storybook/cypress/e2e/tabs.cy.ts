describe("Tabs", () => {
  const stories = ["as-anchors", "as-anchors-disabled", "as-buttons", "as-buttons-disabled"];
  for (const story of stories) {
    it(`should be accessible (${story})`, () => {
      cy.visit(`http://localhost:45000/iframe.html?id=core-tabs--${story}`);
      cy.injectAxe();
      cy.dsoCheckA11y("dso-tabs.hydrated");
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
      .as("dsoTab");
  });

  it("should have the correct attributes", () => {
    const tabs = [
      {
        label: "Zoek op adres",
        modifier: "active",
        href: "/adres",
      },
      {
        label: "Postcode en huisnummer",
        href: "/postcode",
      },
      {
        label: "Kadastraal nummer",
        href: "/kadastraal",
      },
      {
        label: "Coördinaten",
        href: "/coordinaten",
      },
    ];

    tabs.forEach((tab, index) => {
      if (index === 0) {
        cy.get("@dsoTab")
          .eq(index)
          .should("have.text", tab.label)
          .and("have.attr", "active", "")
          .and("have.attr", "href", tab.href)
          .and("have.prop", "active")
          .get("@dsoTab")
          .eq(index)
          .shadow()
          .find("a")
          .should("have.attr", "aria-selected", "true")
          .and("have.attr", "href", tab.href)
          .and("have.attr", "role", "tab")
          .and("not.have.attr", "tabindex");
      } else {
        cy.get("@dsoTab")
          .eq(index)
          .should("have.text", tab.label)
          .and("have.attr", "href", tab.href)
          .and("not.have.attr", "active")
          .get("@dsoTab")
          .eq(index)
          .shadow()
          .find("a")
          .should("have.attr", "aria-selected", "false")
          .and("have.attr", "href", tab.href)
          .and("have.attr", "role", "tab")
          .and("have.attr", "tabindex", "-1");
      }
    });
  });

  // Todo: kunnen we dit überhaupt wel doen? Clicken op een anchor met href gaat navigeren ...
  // Is de eventEmitter dan nog wel te checken?
  xit("should call event on mouse click", () => {
    cy.get("dso-tabs")
      .find("dso-tab:nth-child(2)")
      .as("tab")
      .then(($tab) => {
        $tab.on("dsoTabSwitch", cy.stub().as("dsoTabSwitch"));
      })
      .shadow()
      .find("a")
      .click()
      .get("@dsoTabSwitch")
      .should("be.calledOnce");
  });

  it("should place focus to next and previous tabs with arrow keys", () => {
    cy.get("dso-tabs").find("dso-tab:nth-child(1)").shadow().find("a").focus();

    cy.realPress("ArrowRight");

    cy.get("dso-tabs").find("dso-tab:nth-child(2)").shadow().find("a").should("have.focus");

    cy.realPress("ArrowRight");

    cy.get("dso-tabs").find("dso-tab:nth-child(3)").shadow().find("a").should("have.focus");

    cy.realPress("ArrowRight");

    cy.get("dso-tabs").find("dso-tab:nth-child(4)").shadow().find("a").should("have.focus");

    cy.realPress("ArrowRight");

    cy.get("dso-tabs").find("dso-tab:nth-child(1)").shadow().find("a").should("have.focus");

    cy.realPress("ArrowLeft");

    cy.get("dso-tabs").find("dso-tab:nth-child(4)").shadow().find("a").should("have.focus");

    cy.realPress("ArrowLeft");

    cy.get("dso-tabs").find("dso-tab:nth-child(3)").shadow().find("a").should("have.focus");

    cy.realPress("ArrowLeft");

    cy.get("dso-tabs").find("dso-tab:nth-child(2)").shadow().find("a").should("have.focus");

    cy.realPress("ArrowLeft");

    cy.get("dso-tabs").find("dso-tab:nth-child(1)").shadow().find("a").should("have.focus");
  });
});

describe("Tabs - anchors disabled", () => {
  beforeEach(() => {
    cy.visit(`http://localhost:45000/iframe.html?id=core-tabs--as-anchors-disabled`)
      .get("dso-tabs")
      .find("dso-tab")
      .as("dsoTab");
  });

  it("should have the correct attributes", () => {
    const tabs = [
      {
        label: "Zoek op adres",
        href: "/adres",
      },
      {
        label: "Postcode en huisnummer",
        href: "/postcode",
        modifier: "active",
      },
      {
        label: "Kadastraal nummer",
        href: "/kadastraal",
      },
      {
        label: "Coördinaten",
        href: "/coordinaten",
        modifier: "disabled",
      },
    ];

    tabs.forEach((tab, index) => {
      if (index === 1) {
        cy.get("@dsoTab")
          .eq(index)
          .should("have.text", tab.label)
          .and("have.attr", "active", "")
          .and("have.attr", "href", tab.href)
          .and("have.prop", "active")
          .get("@dsoTab")
          .eq(index)
          .shadow()
          .find("a")
          .should("have.attr", "aria-selected", "true")
          .and("have.attr", "href", tab.href)
          .and("have.attr", "role", "tab")
          .and("not.have.attr", "tabindex");
      } else if (index === 3) {
        cy.get("@dsoTab")
          .eq(index)
          .should("have.text", tab.label)
          .and("have.attr", "disabled", "disabled")
          .and("have.attr", "href", tab.href)
          .and("have.prop", "disabled")
          .get("@dsoTab")
          .eq(index)
          .shadow()
          .find("a")
          .should("have.attr", "aria-selected", "false")
          .and("have.attr", "href", tab.href)
          .and("have.attr", "role", "tab")
          .and("have.attr", "tabindex", "-1");
      } else {
        cy.get("@dsoTab")
          .eq(index)
          .should("have.text", tab.label)
          .and("have.attr", "href", tab.href)
          .and("not.have.attr", "active")
          .get("@dsoTab")
          .eq(index)
          .shadow()
          .find("a")
          .should("have.attr", "aria-selected", "false")
          .and("have.attr", "href", tab.href)
          .and("have.attr", "role", "tab")
          .and("have.attr", "tabindex", "-1");
      }
    });
  });

  // Todo: kunnen we dit überhaupt wel doen? Clicken op een anchor met href gaat navigeren ...
  // Is de eventEmitter dan nog wel te checken?
  xit("should call event on mouse click", () => {
    cy.get("dso-tabs")
      .find("dso-tab:nth-child(2)")
      .then(($tab) => {
        $tab.on("dsoTabSwitch", cy.stub().as("dsoTabSwitch"));
      })
      .shadow()
      .find("a")
      .click()
      .get("@dsoTabSwitch")
      .should("be.calledOnce");
  });

  // Todo: kunnen we dit überhaupt wel doen? Een gefocuste anchor met href activeren middels Enter gaat navigeren ...
  // Is de eventEmitter dan nog wel te checken?
  xit("should call event on enter or space when focussed", () => {
    cy.get("dso-tabs")
      .find("dso-tab:nth-child(2)")
      .as("tab")
      .then(($tab) => {
        $tab.on("dsoTabSwitch", cy.stub().as("dsoTabSwitch"));
      })
      .shadow()
      .find("a")
      .focus();

    cy.realPress("Enter");

    cy.get("@tab").get("@dsoTabSwitch").should("be.calledTwice");
  });

  it("should place focus to next and previous tabs with arrow keys (skipping disabled tabs)", () => {
    cy.get("dso-tabs").find("dso-tab:nth-child(2)").shadow().find("a").focus();

    cy.realPress("ArrowRight");

    cy.get("dso-tabs").find("dso-tab:nth-child(3)").shadow().find("a").should("have.focus");

    cy.realPress("ArrowRight");

    cy.get("dso-tabs").find("dso-tab:nth-child(1)").shadow().find("a").should("have.focus");

    cy.realPress("ArrowLeft");

    cy.get("dso-tabs").find("dso-tab:nth-child(3)").shadow().find("a").should("have.focus");

    cy.realPress("ArrowLeft");

    cy.get("dso-tabs").find("dso-tab:nth-child(2)").shadow().find("a").should("have.focus");

    cy.realPress("ArrowLeft");

    cy.get("dso-tabs").find("dso-tab:nth-child(1)").shadow().find("a").should("have.focus");
  });
});

describe("Tabs - buttons", () => {
  beforeEach(() => {
    cy.visit(`http://localhost:45000/iframe.html?id=core-tabs--as-buttons`)
      .get("dso-tabs")
      .find("dso-tab")
      .as("dsoTab");
  });

  it("should have the correct attributes", () => {
    const tabs = [
      {
        label: "Zoek op adres",
      },
      {
        label: "Postcode en huisnummer",
      },
      {
        label: "Kadastraal nummer",
        modifier: "active",
      },
      {
        label: "Coördinaten",
      },
    ];

    tabs.forEach((tab, index) => {
      if (index === 2) {
        cy.get("@dsoTab")
          .eq(index)
          .should("have.text", tab.label)
          .and("have.attr", "active", "")
          .and("have.prop", "active")
          .get("@dsoTab")
          .eq(index)
          .shadow()
          .find("button")
          .should("have.attr", "aria-selected", "true")
          .and("have.attr", "role", "tab")
          .and("not.have.attr", "tabindex");
      } else {
        cy.get("@dsoTab")
          .eq(index)
          .should("have.text", tab.label)
          .and("not.have.attr", "active")
          .get("@dsoTab")
          .eq(index)
          .shadow()
          .find("button")
          .should("have.attr", "aria-selected", "false")
          .and("have.attr", "role", "tab")
          .and("have.attr", "tabindex", "-1");
      }
    });
  });

  it("should call event on mouse click", () => {
    cy.get("dso-tabs")
      .find("dso-tab:nth-child(2)")
      .as("tab")
      .then(($tab) => {
        $tab.on("dsoTabSwitch", cy.stub().as("dsoTabSwitch"));
      })
      .shadow()
      .find("button")
      .realClick()
      .get("@dsoTabSwitch")
      .should("be.calledOnce");
  });

  it("should place focus to next and previous tabs with arrow keys", () => {
    cy.get("dso-tabs").find("dso-tab:nth-child(3)").shadow().find("button").focus();

    cy.realPress("ArrowRight");

    cy.get("dso-tabs").find("dso-tab:nth-child(4)").shadow().find("button").should("have.focus");

    cy.realPress("ArrowRight");

    cy.get("dso-tabs").find("dso-tab:nth-child(1)").shadow().find("button").should("have.focus");

    cy.realPress("ArrowRight");

    cy.get("dso-tabs").find("dso-tab:nth-child(2)").shadow().find("button").should("have.focus");

    cy.realPress("ArrowRight");

    cy.get("dso-tabs").find("dso-tab:nth-child(3)").shadow().find("button").should("have.focus");

    cy.realPress("ArrowLeft");
    cy.realPress("ArrowLeft");

    cy.get("dso-tabs").find("dso-tab:nth-child(1)").shadow().find("button").should("have.focus");

    cy.realPress("ArrowLeft");

    cy.get("dso-tabs").find("dso-tab:nth-child(4)").shadow().find("button").should("have.focus");
  });
});

describe("Tabs - button disabled", () => {
  beforeEach(() => {
    cy.visit(`http://localhost:45000/iframe.html?id=core-tabs--as-buttons-disabled`)
      .get("dso-tabs")
      .find("dso-tab")
      .as("dsoTab");
  });

  it("should have the correct attributes", () => {
    const tabs = [
      {
        label: "Zoek op adres",
        modifier: "disabled",
      },
      {
        label: "Postcode en huisnummer",
      },
      {
        label: "Kadastraal nummer",
        modifier: "disabled",
      },
      {
        label: "Coördinaten",
        modifier: "active",
      },
    ];

    tabs.forEach((tab, index) => {
      if (index === 3) {
        cy.get("@dsoTab")
          .eq(index)
          .should("have.text", tab.label)
          .and("have.attr", "active", "")
          .and("have.prop", "active")
          .get("@dsoTab")
          .eq(index)
          .shadow()
          .find("button")
          .should("have.attr", "aria-selected", "true")
          .and("have.attr", "role", "tab")
          .and("not.have.attr", "tabindex");
      } else if (index === 2) {
        cy.get("@dsoTab")
          .eq(index)
          .should("have.text", tab.label)
          .and("have.attr", "disabled", "disabled")
          .and("have.prop", "disabled")
          .get("@dsoTab")
          .eq(index)
          .shadow()
          .find("button")
          .should("have.attr", "aria-selected", "false")
          .and("have.attr", "role", "tab")
          .and("have.attr", "tabindex", "-1");
      } else {
        cy.get("@dsoTab")
          .eq(index)
          .should("have.text", tab.label)
          .and("not.have.attr", "active")
          .get("@dsoTab")
          .eq(index)
          .shadow()
          .find("button")
          .should("have.attr", "aria-selected", "false")
          .and("have.attr", "role", "tab")
          .and("have.attr", "tabindex", "-1");
      }
    });
  });

  it("should call event on mouse click", () => {
    cy.get("dso-tabs")
      .find("dso-tab:nth-child(4)")
      .as("tab")
      .then(($tab) => {
        $tab.on("dsoTabSwitch", cy.stub().as("dsoTabSwitch"));
      })
      .shadow()
      .find("button")
      .realClick()
      .get("@dsoTabSwitch")
      .should("be.calledOnce");
  });

  it("should not call event on mouse click on disabled button", () => {
    cy.get("dso-tabs")
      .find("dso-tab:nth-child(3)")
      .as("tab")
      .then(($tab) => {
        $tab.on("dsoTabSwitch", cy.stub().as("dsoTabSwitch"));
      })
      .shadow()
      .find("button")
      .realClick()
      .get("@dsoTabSwitch")
      .should("not.be.calledOnce");
  });

  it("should place focus to next and previous tabs with arrow keys (skipping disabled tabs)", () => {
    cy.get("dso-tabs").find("dso-tab:nth-child(4)").shadow().find("button").focus();

    cy.realPress("ArrowRight");

    cy.get("dso-tabs").find("dso-tab:nth-child(2)").shadow().find("button").should("have.focus");

    cy.realPress("ArrowRight");

    cy.get("dso-tabs").find("dso-tab:nth-child(4)").shadow().find("button").should("have.focus");

    cy.realPress("ArrowLeft");

    cy.get("dso-tabs").find("dso-tab:nth-child(2)").shadow().find("button").should("have.focus");

    cy.realPress("ArrowLeft");

    cy.get("dso-tabs").find("dso-tab:nth-child(4)").shadow().find("button").should("have.focus");
  });

  it("should call event on enter or space when focussed", () => {
    cy.get("dso-tabs")
      .find("dso-tab:nth-child(4)")
      .as("tab")
      .then(($tab) => {
        $tab.on("dsoTabSwitch", cy.stub().as("dsoTabSwitch"));
      })
      .shadow()
      .find("button")
      .focus();

    cy.realPress("Enter");
    cy.realPress("Space");

    cy.get("@tab").get("@dsoTabSwitch").should("be.calledTwice");
  });
});
