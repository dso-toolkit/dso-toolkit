describe("Dropdown menu - anchors", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-dropdown-menu--anchors");
    cy.injectAxe();
    cy.configureAxe({
      rules: [{ id: "color-contrast", enabled: false }],
    });

    cy.get("dso-dropdown-menu.hydrated")
      .should("exist")
      .get("button[slot = 'toggle']")
      .as("button")
      .get(".dso-dropdown-options")
      .as("options")
      .get(".dso-dropdown-options ul li a")
      .as("menuitems");
  });

  it("should open and close on button click", () => {
    cy.get("dso-dropdown-menu.hydrated").matchImageSnapshot();

    cy.get("@options").should("not.be.visible");

    cy.dsoCheckA11y("dso-dropdown-menu.hydrated");

    cy.get("@button").focus().click().should("have.focus");

    cy.get("@options").should("be.visible");

    cy.dsoCheckA11y("dso-dropdown-menu.hydrated");

    cy.get("@button").click().should("have.focus");

    cy.get("@options").should("not.be.visible");
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
    cy.get("@button").should("have.attr", "aria-haspopup", "menu").click().blur();

    cy.get("@button")
      .invoke("attr", "id")
      .then((id) => {
        cy.get("@options").should("have.attr", "role", "menu").should("have.attr", "aria-labelledby", id);
      });

    cy.get(".dso-checked a").should("have.attr", "aria-checked", "true");

    cy.get(".dso-dropdown-options ul").should("have.attr", "role", "group");
    cy.get(".dso-dropdown-options li.dso-group-label").should("have.attr", "role", "none");
    cy.get(".dso-dropdown-options li:not(.dso-group-label)").should("have.attr", "role", "none");

    cy.get("@menuitems").should("have.attr", "role", "menuitemradio");
  });

  it("uncheckable should have role menuitem", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-dropdown-menu--anchors&args=isCheckable:false");

    cy.get("@button").click().blur();

    cy.get("@menuitems").should("have.attr", "role", "menuitem");
  });

  it("tab should cycle through options and button", { browser: "!firefox" }, () => {
    cy.get("@button").focus().click();

    for (const _ of [1, 2, 3]) {
      cy.realPress("Tab");
    }

    cy.get("@menuitems").eq(2).should("have.focus");

    for (const _ of [4, 5, 6, 7, 8]) {
      cy.realPress("Tab");
    }

    cy.get("@button").should("have.focus");

    cy.get("@menuitems").should("be.visible");
  });

  it("shift-tab should cycle through options and button in reverse order", { browser: "!firefox" }, () => {
    cy.get("@button").focus().click();

    cy.realPress("Tab");

    cy.get("@menuitems").eq(0).should("have.focus");

    cy.realPress(["Shift", "Tab"]);

    cy.get("@button").should("have.focus");

    cy.get("@menuitems").should("be.visible");
  });

  it("arrow down should cycle menu", { browser: "!firefox" }, () => {
    cy.get("@button").focus().click();

    for (const _ of [1, 2, 3]) {
      cy.realPress("ArrowDown");
    }

    cy.get("@menuitems").eq(2).should("have.focus");

    for (const _ of [4, 5, 6, 7, 8, 9]) {
      cy.realPress("ArrowDown");
    }

    cy.get("@menuitems").eq(1).should("have.focus");
  });

  it("arrow up should cycle menu", { browser: "!firefox" }, () => {
    cy.get("@button").focus().click();

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
    cy.get("@button").focus().click();

    for (const _ of [1, 2, 3]) {
      cy.realPress("ArrowUp");
    }

    cy.get("@menuitems").eq(4).should("have.focus");

    cy.realPress("Escape");

    cy.get("@options").should("not.be.visible");

    cy.get("@button").should("have.focus");
  });

  it("click outside menu should close menu", { browser: "!firefox" }, () => {
    cy.get("@button").focus().click();

    cy.get("body").click();

    cy.get("@options").should("not.be.visible");

    cy.get("@button").focus().click();

    cy.realPress("Tab");

    cy.get("body").click();

    cy.get("@options").should("not.be.visible");
  });

  it("should close on item selection", () => {
    cy.get("@menuitems")
      .eq(1)
      .then((a) => {
        a.get(0).addEventListener("click", (e) => {
          e.preventDefault();
        });
      });

    cy.get("@button").focus().click();

    cy.get("@options").should("be.visible");

    cy.get("@menuitems").eq(1).click();

    cy.get("@options").should("not.be.visible");
  });
});

describe("Dropdown menu - buttons", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-dropdown-menu--buttons");
    cy.injectAxe();
    cy.configureAxe({
      rules: [{ id: "color-contrast", enabled: false }],
    });
    cy.get("button[slot = 'toggle']").as("button");
    cy.get(".dso-dropdown-options").as("options");
    cy.get(".dso-dropdown-options ul li button").as("menuitems");
  });

  it("should open and close on button click", () => {
    cy.get("@options").should("not.be.visible");

    cy.dsoCheckA11y("dso-dropdown-menu.hydrated");

    cy.get("@button").focus().click().should("have.focus");

    cy.get("@options").should("be.visible");

    cy.dsoCheckA11y("dso-dropdown-menu.hydrated");

    cy.get("@button").click().should("have.focus");

    cy.get("@options").should("not.be.visible");
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
    cy.get("@button").should("have.attr", "aria-haspopup", "menu").click().blur();

    cy.get("@button")
      .invoke("attr", "id")
      .then((id) => {
        cy.get("@options").should("have.attr", "role", "menu").should("have.attr", "aria-labelledby", id);
      });

    cy.get(".dso-dropdown-options ul").should("have.attr", "role", "group");
    cy.get(".dso-dropdown-options li:not(.dso-group-label)").should("have.attr", "role", "none");

    cy.get("@menuitems").should("have.attr", "role", "menuitem");
  });

  it("checkable should have role menuitemradio", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-dropdown-menu--buttons&args=isCheckable:true");

    cy.get("@button").click().blur();

    cy.get("@menuitems").should("have.attr", "role", "menuitemradio");
  });

  it("tab should cycle through options and button", { browser: "!firefox" }, () => {
    cy.get("@button").focus().click();

    cy.realPress("Tab");
    cy.realPress("Tab");

    cy.get("@menuitems").eq(1).should("have.focus");

    cy.realPress("Tab");

    cy.get("@button").should("have.focus");

    cy.get("@options").should("be.visible");
  });

  it("shift-tab should cycle through options and button in reverse order", { browser: "!firefox" }, () => {
    cy.get("@button").focus().click();

    cy.realPress("Tab");

    cy.get("@menuitems").eq(0).should("have.focus");

    cy.realPress(["Shift", "Tab"]);

    cy.get("@options").should("be.visible");

    cy.get("@button").should("have.focus");
  });

  it("arrow down should cycle menu", { browser: "!firefox" }, () => {
    cy.get("@button").focus().click();

    cy.realPress("ArrowDown");
    cy.realPress("ArrowDown");

    cy.get("@menuitems").eq(1).should("have.focus");

    cy.realPress("ArrowDown");

    cy.get("@menuitems").eq(0).should("have.focus");
  });

  it("arrow up should cycle menu", { browser: "!firefox" }, () => {
    cy.get("@button").focus().click();

    cy.realPress("ArrowUp");
    cy.realPress("ArrowUp");

    cy.get("@menuitems").eq(0).should("have.focus");

    cy.realPress("ArrowUp");

    cy.get("@menuitems").eq(1).should("have.focus");
  });

  it("esc should close menu and focus button", { browser: "!firefox" }, () => {
    cy.get("@button").focus().click();

    cy.realPress("ArrowUp");

    cy.get("@menuitems").eq(1).should("have.focus");

    cy.realPress("Escape");

    cy.get("@options").should("not.be.visible");

    cy.get("@button").should("have.focus");
  });

  it("click outside menu should close menu", { browser: "!firefox" }, () => {
    cy.get("@button").focus().click();

    cy.get("body").click();

    cy.get("@options").should("not.be.visible");

    cy.get("@button").focus().click();

    cy.realPress("Tab");

    cy.get("body").click();

    cy.get("@options").should("not.be.visible");
  });
});
