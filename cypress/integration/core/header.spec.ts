describe("Header", () => {
  it("should be accessible", () => {
    cy.visit("http://localhost:56106/iframe.html?id=header--header");
    cy.injectAxe();
    cy.checkA11y("dso-header");
    cy.visit(
      "http://localhost:56106/iframe.html?id=header--header&args=useDropDownMenu:true"
    );
    cy.injectAxe();
    cy.checkA11y("dso-header");
    cy.viewport(400, 600);
    cy.visit(
      "http://localhost:56106/iframe.html?id=header--header&args=useDropDownMenu:false"
    );
    cy.injectAxe();
    cy.checkA11y("dso-header");
  });

  it("should show/remove dropdownmenu", () => {
    cy.visit("http://localhost:56106/iframe.html?id=header--header");
    cy.get("dso-header").shadow().find("nav").should("be.visible");
    cy.get("dso-header")
      .shadow()
      .find(".dropdown dso-dropdown-menu")
      .should("not.exist");
    cy.viewport(991, 600);
    cy.get("dso-header").shadow().find("nav").should("not.exist");
    cy.get("dso-header")
      .shadow()
      .find(".dropdown dso-dropdown-menu")
      .should("be.visible");
    cy.viewport(992, 600);
    cy.get("dso-header").shadow().find("nav").should("be.visible");
    cy.get("dso-header")
      .shadow()
      .find(".dropdown dso-dropdown-menu")
      .should("not.exist");
  });

  // Disabled in #1500, enable in #1532
  it.skip("should show/remove overflowmenu", () => {
    cy.visit(
      "http://localhost:56106/iframe.html?id=header--header&args=useDropDownMenu:false"
    );
    cy.get("dso-header")
      .shadow()
      .find("nav ul li dso-dropdown-menu")
      .should("not.exist");
    cy.viewport(568, 600);
    cy.get("dso-header")
      .shadow()
      .find("nav ul li dso-dropdown-menu")
      .should("be.visible");
    cy.viewport(992, 600);
    cy.get("dso-header")
      .shadow()
      .find("nav ul li dso-dropdown-menu")
      .should("not.exist");
  });

  it("should act on is-logged-in attribute", () => {
    cy.visit("http://localhost:56106/iframe.html?id=header--header");
    cy.get("dso-header").shadow().find(".login").should("be.visible");
    cy.get("dso-header").shadow().find(".logout").should("not.exist");
    cy.get("dso-header").shadow().find(".profile").should("not.exist");
    cy.get("dso-header").invoke("attr", "is-logged-in", true);
    cy.get("dso-header").shadow().find(".login").should("not.exist");
    cy.get("dso-header").shadow().find(".logout").should("be.visible");
    cy.get("dso-header").shadow().find(".profile").should("be.visible");
  });

  it("should act on login-url attribute", () => {
    cy.visit("http://localhost:56106/iframe.html?id=header--header");
    cy.get("dso-header").shadow().find(".login").should("be.visible");
    cy.get("dso-header").invoke("removeAttr", "login-url");
    cy.get("dso-header").shadow().find(".login").should("not.exist");
  });

  it("should act on logout-url attribute", () => {
    cy.visit("http://localhost:56106/iframe.html?id=header--header");
    cy.get("dso-header").invoke("attr", "is-logged-in", true);
    cy.get("dso-header").shadow().find(".logout").should("be.visible");
    cy.get("dso-header").invoke("removeAttr", "logout-url");
    cy.get("dso-header").shadow().find(".logout").should("not.exist");
  });

  it("should act on user-profile attributes", () => {
    cy.visit("http://localhost:56106/iframe.html?id=header--header");
    cy.get("dso-header").invoke("attr", "is-logged-in", true);
    cy.get("dso-header").shadow().find(".profile").should("be.visible");
    cy.get("dso-header").invoke("removeAttr", "user-profile-url");
    cy.get("dso-header").invoke("removeAttr", "user-profile-name");
    cy.get("dso-header").shadow().find(".profile").should("not.exist");
  });

  it("should act on user-home-url attribute", () => {
    cy.visit("http://localhost:56106/iframe.html?id=header--header");
    cy.get("dso-header").invoke("attr", "is-logged-in", true);
    cy.get("dso-header")
      .shadow()
      .find("nav li.menu-user-home")
      .should("be.visible");
    cy.get("dso-header").invoke("removeAttr", "user-home-url");
    cy.get("dso-header")
      .shadow()
      .find("nav li.menu-user-home")
      .should("not.exist");
  });

  it("should emit menuItemClick event on menu item click", () => {
    cy.visit("http://localhost:56106/iframe.html?id=header--header");
    cy.get("dso-header").then((c) => {
      c.get(0).addEventListener("menuItemClick", cy.stub().as("menuItemClick"));
    });
    cy.get("dso-header").shadow().find("nav ul li:first-child a").click();
    cy.get("@menuItemClick").should("have.been.calledWithMatch", {
      detail: {
        menuItem: {
          active: true,
          label: "Home",
          url: "#home",
        },
        originalEvent: {
          type: "click",
          defaultPrevented: true,
        },
      },
    });
  });
});
