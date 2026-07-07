describe("Dropdown menu - anchors", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-dropdown-menu--anchors");
    cy.injectAxe();

    cy.get("dso-dropdown-menu.hydrated")
      .shadow()
      .as("shadow")
      .find("button.dso-secondary")
      .as("button")
      .get("@shadow")
      .find(".dso-dropdown-options")
      .as("options");

    cy.get("dso-dropdown-menu.hydrated").get("dso-dropdown-menu-item").as("menuitems");
  });

  it("should open and close on button click", () => {
    cy.get("@menuitems").should("not.be.visible");

    cy.dsoCheckA11y("dso-dropdown-menu.hydrated");

    cy.get("@button").should("be.visible").focus().click();

    cy.get("@menuitems").eq(0).should("have.focus");

    cy.get("@menuitems").should("be.visible");

    /**
     * Ignoring the 'color-contrast' violation on the anchor inside a disabled dso-tab:
     *
     * 1 accessibility violation was detected
     * ┌─────────┬──────────────────┬───────────┬──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┬───────┐
     * │ (index) │ id               │ impact    │ description                                                                                                      │ nodes │
     * ├─────────┼──────────────────┼───────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────┤
     * │ 0       │ 'color-contrast' │ 'serious' │ 'Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds' │ 2     │
     * └─────────┴──────────────────┴───────────┴──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┴───────┘
     */
    cy.get("dso-dropdown-menu.hydrated")
      .as("dropdownMenu")
      .shadow()
      .find(".dso-dropdown-options")
      .should("have.attr", "role", "menu")
      .get("@dropdownMenu")
      .get("dso-dropdown-menu-group")
      .shadow()
      .find("div[aria-labelledby]")
      .should("have.attr", "role", "group")
      .find("div.group-label")
      .should("have.attr", "role", "none")
      .get("@dropdownMenu")
      .get("dso-dropdown-menu-item")
      .shadow()
      .find("a")
      .should("have.attr", "role", "menuitemradio")
      .dsoCheckA11y("dso-dropdown-menu.hydrated", {
        rules: { "color-contrast": { enabled: false } },
      });

    cy.get("@button").click().should("have.focus");

    cy.get("@menuitems").should("not.be.visible");
  });

  it("matches snapshots", () => {
    cy.get("dso-dropdown-menu.hydrated").matchImageSnapshot(`type=link -- ${Cypress.currentTest.title} -- not open`);

    cy.get("@button").should("be.visible").focus().click();

    cy.get("@menuitems").eq(0).should("have.focus");

    cy.get("@menuitems").should("be.visible");

    cy.viewport(408, 408);
    cy.matchImageSnapshot(`type=link -- ${Cypress.currentTest.title} -- open`);
  });

  it("should have aria-expanded", () => {
    cy.get("@button")
      .focus()
      .should("have.attr", "aria-expanded", "false")
      .click()
      .should("have.attr", "aria-expanded", "true")
      .click()
      .should("have.attr", "aria-expanded", "false");
  });

  it("should have role menu with menuitemradio", () => {
    cy.get("@button").should("have.attr", "aria-haspopup", "menu").click();

    cy.get("@button")
      .should("have.attr", "aria-haspopup", "menu")
      .click()
      .invoke("attr", "id")
      .then((id) => {
        cy.get("@options").should("have.attr", "role", "menu").should("have.attr", "aria-labelledby", id);
      });

    cy.get("dso-dropdown-menu-item[checked]").shadow().find("a").should("have.attr", "aria-checked", "true");

    cy.get("@menuitems")
      .shadow()
      .find("a")
      .should("have.attr", "role")
      .and("match", /menuitem(radio)?/);
  });

  it("uncheckable should have role menuitem", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-dropdown-menu--anchors&args=checkable:false");

    cy.get("dso-dropdown-menu.hydrated", { timeout: 10000 }).shadow().find("button.dso-secondary").click();

    cy.get("dso-dropdown-menu-item")
      .should("have.length.greaterThan", 0)
      .each(($item) => {
        cy.wrap($item).shadow().find("a").should("have.attr", "role", "menuitem");
      });
  });

  it("should move focus to the first menu item on open", () => {
    cy.get("@button").should("be.visible").focus().click();

    cy.get("@menuitems").eq(0).should("have.focus");
  });

  it("tab should cycle through options and button", { browser: "!firefox" }, () => {
    cy.get("@button").should("be.visible").focus().click();

    cy.get("@menuitems").eq(0).should("have.focus");

    for (const _ of [1, 2]) {
      cy.realPress("Tab");
    }

    cy.get("@menuitems").eq(2).should("have.focus");

    for (const _ of [3, 4, 5, 6, 7]) {
      cy.realPress("Tab");
    }

    cy.get("dso-dropdown-menu.hydrated").get("@button").should("have.focus");

    cy.get("@menuitems").should("be.visible");
  });

  it("shift-tab should cycle through options and button in reverse order", { browser: "!firefox" }, () => {
    cy.get("@button").should("be.visible").focus().click();

    cy.get("@menuitems").eq(0).should("have.focus");

    cy.realPress(["Shift", "Tab"]);

    cy.get("dso-dropdown-menu.hydrated").get("@button").should("have.focus");

    cy.get("@menuitems").should("be.visible");
  });

  it("arrow down should cycle menu", { browser: "!firefox" }, () => {
    cy.get("@button").should("be.visible").focus().click();

    cy.get("@menuitems").eq(0).should("have.focus");

    for (const _ of [1, 2, 3]) {
      cy.realPress("ArrowDown");
    }

    cy.get("@menuitems").eq(3).should("have.focus");

    for (const _ of [4, 5, 6, 7, 8, 9]) {
      cy.realPress("ArrowDown");
    }

    cy.get("@menuitems").eq(2).should("have.focus");
  });

  it("arrow up should cycle menu", { browser: "!firefox" }, () => {
    cy.get("@button").should("be.visible").focus().click();

    cy.get("@menuitems").eq(0).should("have.focus");

    for (const _ of [1, 2, 3]) {
      cy.realPress("ArrowUp");
    }

    cy.get("@menuitems").eq(4).should("have.focus");

    for (const _ of [4, 5, 6, 7, 8, 9]) {
      cy.realPress("ArrowUp");
    }

    cy.get("@menuitems").eq(5).should("have.focus");
  });

  it("esc should close menu and focus button", { browser: "!firefox" }, () => {
    cy.get("@button").should("be.visible").focus().click();

    cy.get("@menuitems").eq(0).should("have.focus");

    for (const _ of [1, 2, 3]) {
      cy.realPress("ArrowUp");
    }

    cy.get("@menuitems").eq(4).should("have.focus");

    cy.realPress("Escape");

    cy.get("dso-dropdown-menu.hydrated").get("@options").should("not.be.visible");

    cy.get("@button").should("have.focus");
  });

  it("click outside menu should close menu", { browser: "!firefox" }, () => {
    cy.get("@button").should("be.visible").focus().click();

    cy.get("body").click();

    cy.get("@options").should("not.be.visible");

    cy.get("@button").should("be.visible").focus().click();

    cy.realPress("Tab");

    cy.get("dso-dropdown-menu.hydrated").get("body").click();

    cy.get("@options").should("not.be.visible");
  });

  it("keeps the focused menu item visible when the dropdown becomes scrollable", { browser: "!firefox" }, () => {
    cy.viewport(320, 180);

    cy.get("@button").focus().click();
    cy.get("@menuitems").first().should("be.visible");

    cy.get("@options").should(($options) => {
      const optionsRect = $options[0]!.getBoundingClientRect();

      expect(Number.parseFloat($options.css("max-height"))).to.be.greaterThan(0);
      expect(Number.parseFloat($options.css("max-inline-size"))).to.be.greaterThan(0);
      expect($options.css("overflow-y")).to.eq("auto");
      expect($options[0]!.scrollHeight).to.be.greaterThan($options[0]!.clientHeight);

      expect(optionsRect.top).to.be.at.least(0);
      expect(optionsRect.bottom).to.be.at.most(Cypress.config("viewportHeight"));
    });

    cy.get("@options").then(($options) => {
      const optionsRect = $options[0]!.getBoundingClientRect();

      cy.get("@button").then(($button) => {
        const toggleButton = $button[0]!;

        cy.get("@menuitems")
          .its("length")
          .then((count) => {
            for (const _ of Array.from({ length: count })) {
              cy.realPress("Tab");

              cy.focused().then(($focused) => {
                const focusedElement = $focused[0]!;

                if (focusedElement === toggleButton) {
                  return;
                }

                const focusedRect = focusedElement.getBoundingClientRect();

                expect(focusedRect.top).to.be.at.least(optionsRect.top - 1);
                expect(focusedRect.bottom).to.be.at.most(optionsRect.bottom + 1);
              });
            }
          });
      });
    });
  });

  it("should close on item selection", () => {
    cy.get("@menuitems")
      .eq(1)
      .then((menuItem) => {
        menuItem.get(0).addEventListener("click", (e) => {
          e.preventDefault();
        });
      });

    cy.get("@button").should("be.visible").focus().click();

    cy.get("@menuitems").should("be.visible");

    cy.get("@menuitems").eq(1).click({ force: true });

    cy.get("@menuitems").should("not.be.visible");
  });
});

describe("Dropdown menu - buttons", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-dropdown-menu--buttons");
    cy.injectAxe();

    cy.get("dso-dropdown-menu.hydrated")
      .shadow()
      .as("shadow")
      .find("button.dso-secondary")
      .as("button")
      .get("@shadow")
      .find(".dso-dropdown-options")
      .as("options");

    cy.get("dso-dropdown-menu.hydrated").get("dso-dropdown-menu-item").as("menuitems");
  });

  it("should open and close on button click", () => {
    cy.get("@menuitems").should("not.be.visible");

    cy.dsoCheckA11y("dso-dropdown-menu.hydrated");

    cy.get("@button").should("be.visible").focus().click();

    cy.get("@menuitems").eq(0).should("have.focus");

    cy.get("@menuitems").should("be.visible");

    cy.get("@button").click().should("have.focus");

    cy.get("@menuitems").should("not.be.visible");
  });

  it("matches snapshots", () => {
    cy.get("dso-dropdown-menu.hydrated").matchImageSnapshot(`type=button -- ${Cypress.currentTest.title} -- not open`);

    cy.get("@button").should("be.visible").focus().click();

    cy.get("@menuitems").eq(0).should("have.focus");

    cy.get("@menuitems").should("be.visible");

    cy.viewport(200, 150);
    cy.matchImageSnapshot(`type=button -- ${Cypress.currentTest.title} -- open`);
  });

  it("should have role menu with menuitem", () => {
    cy.get("@button").focus().click();

    cy.get("dso-dropdown-menu.hydrated")
      .get("dso-dropdown-menu-item")
      .shadow()
      .find("button")
      .each((button) => cy.wrap(button).should("have.attr", "role", "menuitem"));
  });

  it("checkable should have role menuitemradio", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-dropdown-menu--buttons&args=checkable:true");

    cy.get("@button").should("be.visible").focus().click();

    cy.get("@menuitems").each((menuItem) =>
      cy.wrap(menuItem).shadow().find("button").should("have.attr", "role", "menuitemradio"),
    );
  });

  it("should move focus to the first menu item on open", () => {
    cy.get("@button").should("be.visible").focus().click();

    cy.get("@menuitems").eq(0).should("have.focus");
  });

  it("tab should cycle through options and button", { browser: "!firefox" }, () => {
    cy.get("@button").should("be.visible").focus().click();

    cy.get("@menuitems").eq(0).should("have.focus");

    cy.realPress("Tab");

    cy.get("@menuitems").eq(1).should("have.focus");

    cy.realPress("Tab");

    cy.get("dso-dropdown-menu.hydrated").get("@button").should("have.focus");

    cy.get("@menuitems").should("be.visible");
  });

  it("shift-tab should cycle through options and button in reverse order", { browser: "!firefox" }, () => {
    cy.get("@button").should("be.visible").focus().click();

    cy.get("@menuitems").eq(0).should("have.focus");

    cy.realPress(["Shift", "Tab"]);

    cy.get("@menuitems").should("be.visible");

    cy.get("@button").should("have.focus");
  });

  it("arrow down should cycle menu", { browser: "!firefox" }, () => {
    cy.get("@button").should("be.visible").focus().click();

    cy.get("@menuitems").eq(0).should("have.focus");

    cy.realPress("ArrowDown");

    cy.get("@menuitems").eq(1).should("have.focus");

    cy.realPress("ArrowDown");

    cy.get("@menuitems").eq(0).should("have.focus");
  });

  it("arrow up should cycle menu", { browser: "!firefox" }, () => {
    cy.get("@button").should("be.visible").focus().click();

    cy.get("@menuitems").eq(0).should("have.focus");

    cy.realPress("ArrowUp");
    cy.realPress("ArrowUp");

    cy.get("@menuitems").eq(0).should("have.focus");

    cy.realPress("ArrowUp");

    cy.get("@menuitems").eq(1).should("have.focus");
  });

  it("esc should close menu and focus button", { browser: "!firefox" }, () => {
    cy.get("@button").should("be.visible").focus().click();

    cy.get("@menuitems").eq(0).should("have.focus");

    cy.realPress("ArrowUp");

    cy.get("@menuitems").eq(1).should("have.focus");

    cy.realPress("Escape");

    cy.get("dso-dropdown-menu.hydrated").get("@options").should("not.be.visible");

    cy.get("@button").should("have.focus");
  });

  it("click outside menu should close menu", { browser: "!firefox" }, () => {
    cy.get("@button").should("be.visible").focus().click();

    cy.get("body").click();

    cy.get("@options").should("not.be.visible");

    cy.get("@button").should("be.visible").focus().click();

    cy.realPress("Tab");

    cy.get("dso-dropdown-menu.hydrated").get("body").click();

    cy.get("@options").should("not.be.visible");
  });
});
