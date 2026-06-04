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
    cy.get("dso-dropdown-menu.hydrated").matchImageSnapshot(`type=link -- ${Cypress.currentTest.title} -- not open`);

    cy.get("@menuitems").should("not.be.visible");

    cy.dsoCheckA11y("dso-dropdown-menu.hydrated");

    cy.get("@button").should("be.visible").focus().click().should("have.focus");

    cy.get("@menuitems").should("be.visible");

    // Take the entire page, otherwise the list of menu items will not be snapped
    cy.viewport(408, 408);
    cy.matchImageSnapshot(`type=link -- ${Cypress.currentTest.title} -- open`);

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
      .invoke("attr", "id")
      .then((id) => {
        cy.get("dso-dropdown-menu.hydrated")
          .get("@options")
          .should("have.attr", "role", "menu")
          .should("have.attr", "aria-labelledby", id);
      });

    cy.get("dso-dropdown-menu.hydrated")
      .get("dso-dropdown-menu-item[checked]")
      .shadow()
      .find("a")
      .should("have.attr", "aria-checked", "true");

    cy.get("@menuitems").each((menuItem) =>
      cy.wrap(menuItem).shadow().find("a").should("have.attr", "role", "menuitemradio"),
    );
  });

  it("uncheckable should have role menuitem", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-dropdown-menu--anchors&args=checkable:false");

    cy.get("@button").focus().click();

    cy.get("dso-dropdown-menu.hydrated")
      .get("dso-dropdown-menu-item")
      .shadow()
      .find("a")
      .each((a) => cy.wrap(a).should("have.attr", "role", "menuitem"));
  });

  it("tab should cycle through options and button", { browser: "!firefox" }, () => {
    cy.get("@button").should("be.visible").focus().click();

    for (const _ of [1, 2, 3]) {
      cy.realPress("Tab");
    }

    cy.get("dso-dropdown-menu.hydrated").get("@menuitems").eq(2).should("have.focus");

    for (const _ of [4, 5, 6, 7, 8]) {
      cy.realPress("Tab");
    }

    cy.get("dso-dropdown-menu.hydrated").get("@button").should("have.focus");

    cy.get("@menuitems").should("be.visible");
  });

  it("shift-tab should cycle through options and button in reverse order", { browser: "!firefox" }, () => {
    cy.get("@button").should("be.visible").focus().click();

    cy.realPress("Tab");

    cy.get("dso-dropdown-menu.hydrated").get("@menuitems").eq(0).should("have.focus");

    cy.realPress(["Shift", "Tab"]);

    cy.get("dso-dropdown-menu.hydrated").get("@button").should("have.focus");

    cy.get("@menuitems").should("be.visible");
  });

  it("arrow down should cycle menu", { browser: "!firefox" }, () => {
    cy.get("@button").should("be.visible").focus().click();

    for (const _ of [1, 2, 3]) {
      cy.realPress("ArrowDown");
    }

    cy.get("dso-dropdown-menu.hydrated").get("@menuitems").eq(2).should("have.focus");

    for (const _ of [4, 5, 6, 7, 8, 9]) {
      cy.realPress("ArrowDown");
    }

    cy.get("dso-dropdown-menu.hydrated").get("@menuitems").eq(1).should("have.focus");
  });

  it("arrow up should cycle menu", { browser: "!firefox" }, () => {
    cy.get("@button").should("be.visible").focus().click();

    for (const _ of [1, 2, 3]) {
      cy.realPress("ArrowUp");
    }

    cy.get("dso-dropdown-menu.hydrated").get("@menuitems").eq(4).should("have.focus");

    for (const _ of [4, 5, 6, 7, 8, 9]) {
      cy.realPress("ArrowUp");
    }

    cy.get("dso-dropdown-menu.hydrated").get("@menuitems").eq(5).should("have.focus");
  });

  it("esc should close menu and focus button", { browser: "!firefox" }, () => {
    cy.get("@button").should("be.visible").focus().click();

    for (const _ of [1, 2, 3]) {
      cy.realPress("ArrowUp");
    }

    cy.get("dso-dropdown-menu.hydrated").get("@menuitems").eq(4).should("have.focus");

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
    cy.get("dso-dropdown-menu.hydrated").matchImageSnapshot(`type=button -- ${Cypress.currentTest.title} -- not open`);

    cy.get("@menuitems").should("not.be.visible");

    cy.dsoCheckA11y("dso-dropdown-menu.hydrated");

    cy.get("@button").should("be.visible").focus().click().should("have.focus");

    cy.get("@menuitems").should("be.visible");

    // Take the entire page, otherwise the list of menu items will not be snapped
    cy.viewport(200, 150);
    cy.matchImageSnapshot(`type=button -- ${Cypress.currentTest.title} -- open`);

    cy.get("@button").click().should("have.focus");

    cy.get("@menuitems").should("not.be.visible");
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

  it("tab should cycle through options and button", { browser: "!firefox" }, () => {
    cy.get("@button").should("be.visible").focus().click();

    cy.realPress("Tab");
    cy.realPress("Tab");

    cy.get("dso-dropdown-menu.hydrated").get("@menuitems").eq(1).should("have.focus");

    cy.realPress("Tab");

    cy.get("dso-dropdown-menu.hydrated").get("@button").should("have.focus");

    cy.get("@menuitems").should("be.visible");
  });

  it("shift-tab should cycle through options and button in reverse order", { browser: "!firefox" }, () => {
    cy.get("@button").should("be.visible").focus().click();

    cy.realPress("Tab");

    cy.get("dso-dropdown-menu.hydrated").get("@menuitems").eq(0).should("have.focus");

    cy.realPress(["Shift", "Tab"]);

    cy.get("dso-dropdown-menu.hydrated").get("@menuitems").should("be.visible");

    cy.get("@button").should("have.focus");
  });

  it("arrow down should cycle menu", { browser: "!firefox" }, () => {
    cy.get("@button").should("be.visible").focus().click();

    cy.realPress("ArrowDown");
    cy.realPress("ArrowDown");

    cy.get("dso-dropdown-menu.hydrated").get("@menuitems").eq(1).should("have.focus");

    cy.realPress("ArrowDown");

    cy.get("dso-dropdown-menu.hydrated").get("@menuitems").eq(0).should("have.focus");
  });

  it("arrow up should cycle menu", { browser: "!firefox" }, () => {
    cy.get("@button").should("be.visible").focus().click();

    cy.realPress("ArrowUp");
    cy.realPress("ArrowUp");

    cy.get("dso-dropdown-menu.hydrated").get("@menuitems").eq(0).should("have.focus");

    cy.realPress("ArrowUp");

    cy.get("dso-dropdown-menu.hydrated").get("@menuitems").eq(1).should("have.focus");
  });

  it("esc should close menu and focus button", { browser: "!firefox" }, () => {
    cy.get("@button").should("be.visible").focus().click();

    cy.realPress("ArrowUp");

    cy.get("dso-dropdown-menu.hydrated").get("@menuitems").eq(1).should("have.focus");

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
