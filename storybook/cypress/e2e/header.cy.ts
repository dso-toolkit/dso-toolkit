import { HeaderMenuItem } from "@dso-toolkit/core";

describe("Header", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-header--with-label").injectAxe();

    prepareComponent();
  });

  const defaultMenuItems = [
    {
      label: "Home",
      url: "#home",
      active: true,
    },
    {
      label: "Vergunningscheck",
      url: "#vergunningscheck",
    },
    {
      label: "Aanvragen",
      url: "#aanvragen",
    },
    {
      label: "Regels op de kaart",
      url: "#regelsopdekaart",
    },
    {
      label: "Maatregelen op maat",
      url: "#maatregelenopmaat",
    },
    {
      label: "Hulpcentrum",
      url: "#hulpcentrum",
    },
  ];

  /** Configure the component and set an eventListener as @headerListener the `dso-header` is set as @dsoHeader and the `dso-header` shadow dom as @dsoHeaderShadow */
  function prepareComponent() {
    cy.get("dso-header.hydrated")
      .then(($header) => {
        $header.on("dsoHeaderClick", ($event) => {
          if ($event.originalEvent instanceof CustomEvent) {
            $event.originalEvent.detail.originalEvent.preventDefault();
          }
        });
        $header.on("dsoHeaderClick", cy.stub().as("headerListener"));
      })
      .shadow()
      .as("dsoHeaderShadow");
  }

  function setMenuItems($header: JQuery<HTMLDsoHeaderElement>, items?: HeaderMenuItem[]) {
    const element = $header.get(0);

    if (element) {
      element.mainMenu = items;
    }
  }

  it("should be accessible", () => {
    cy.dsoCheckA11y("dso-header.hydrated");

    cy.get("dso-header.hydrated").invoke("attr", "useDropDownMenu", "always").dsoCheckA11y("dso-header.hydrated");

    cy.get("dso-header.hydrated")
      // .matchImageSnapshot(`${Cypress.currentTest.title} -- dropdown menu`) // will be restored through #3032
      .viewport(400, 600)
      .get("dso-header")
      .invoke("attr", "useDropDownMenu", "auto")
      .dsoCheckA11y("dso-header.hydrated");
  });

  it("matches snapshot", () => {
    cy.viewport(1225, 660)
      .get("dso-header.hydrated")
      .matchImageSnapshot(`${Cypress.currentTest.title} -- all menuitems visible`);

    cy.viewport(1000, 660)
      .get("@dsoHeaderShadow")
      .find("dso-dropdown-menu.hydrated")
      .should("be.visible")
      .get("@dsoHeaderShadow")
      .find(".dso-dropdown-options ul li")
      .should("have.length", 2);

    cy.get("dso-header.hydrated").matchImageSnapshot(`${Cypress.currentTest.title} -- 2 menuitems in dropdown menu`);
  });

  it("should show and remove dropdownmenu", () => {
    cy.get("@dsoHeaderShadow")
      .find("nav")
      .should("be.visible")
      .get("@dsoHeaderShadow")
      .find(".dropdown dso-dropdown-menu")
      .should("not.exist")
      .viewport(991, 600)
      .get("@dsoHeaderShadow")
      .find("nav")
      .should("not.exist")
      .get("@dsoHeaderShadow")
      .find(".dropdown dso-dropdown-menu")
      .should("be.visible")
      .viewport(992, 600)
      .get("@dsoHeaderShadow")
      .find("nav")
      .should("be.visible")
      .get("@dsoHeaderShadow")
      .find(".dropdown dso-dropdown-menu")
      .should("not.exist");
  });

  it("should show/remove overflowmenu", () => {
    cy.viewport(1280, 600)
      .get("@dsoHeaderShadow")
      .find("nav")
      .should("exist")
      .and("be.visible")
      .find("ul li dso-dropdown-menu")
      .should("not.exist")
      .and("be.null")
      .viewport(992, 600)
      .get("@dsoHeaderShadow")
      .find("nav ul li dso-dropdown-menu")
      .should("exist")
      .and("be.visible")
      .viewport(568, 600)
      .get("@dsoHeaderShadow")
      .find("nav ul li dso-dropdown-menu")
      .should("not.exist")
      .and("be.null");
  });

  it("should act on user-profile attributes", () => {
    cy.get("dso-header.hydrated")
      .invoke("attr", "auth-status", "loggedIn")
      .get("@dsoHeaderShadow")
      .find(".profile")
      .should("be.visible")
      .get("dso-header")
      .invoke("removeAttr", "user-profile-url")
      .invoke("removeAttr", "user-profile-name")
      .get("@dsoHeaderShadow")
      .find(".profile")
      .should("not.exist");
  });

  it("should act on user-home-url attribute", () => {
    cy.get("dso-header.hydrated")
      .invoke("attr", "auth-status", "loggedIn")
      .get("@dsoHeaderShadow")
      .find("nav li.menu-user-home")
      .should("be.visible")
      .get("dso-header")
      .invoke("removeAttr", "user-home-url")
      .get("@dsoHeaderShadow")
      .find("nav li.menu-user-home")
      .should("not.exist");
  });

  it("should act on show-help attribute", () => {
    cy.get("dso-header.hydrated")
      .invoke("attr", "show-help", true)
      .get("@dsoHeaderShadow")
      .find(".dso-header-session .help button")
      .should("be.visible");
  });

  it("should use an anchor if help-url is passed", () => {
    cy.get("dso-header.hydrated")
      .invoke("attr", "show-help", true)
      .invoke("attr", "help-url", "#help")
      .get("@dsoHeaderShadow")
      .find(".dso-header-session .help a")
      .should("be.visible");
  });

  it("should not show menu", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-header--with-label&args=noMainMenu:true");

    prepareComponent();

    cy.get("dso-header.hydrated")
      .invoke("removeAttr", "user-home-url")
      .get("@dsoHeaderShadow")
      .find("nav")
      .should("not.exist")
      .get("@dsoHeaderShadow")
      .find("dso-dropdown-menu")
      .should("not.exist");
  });

  it("should show login or logout when no menuItems are provided", () => {
    cy.get<HTMLDsoHeaderElement>("dso-header.hydrated")
      .then(($header) => setMenuItems($header, []))
      .invoke("attr", "login-url", "#login")
      .invoke("attr", "logout-url", "#logout")
      .invoke("attr", "auth-status", "loggedOut")
      .get("@dsoHeaderShadow")
      .find(".login > a")
      .should("be.visible")
      .get("dso-header")
      .invoke("attr", "auth-status", "loggedIn")
      .get("@dsoHeaderShadow")
      .find(".logout > a")
      .should("be.visible");
  });

  it("should show correct login and logout when appropriate (and as anchors when url is provided)", () => {
    cy.get("dso-header.hydrated")
      // Show as <button>
      .invoke("removeAttr", "login-url")
      .invoke("removeAttr", "logout-url")
      .invoke("attr", "auth-status", "loggedOut")
      .get("@dsoHeaderShadow")
      .find(".login > button")
      .should("be.visible")
      .get("dso-header")
      .invoke("attr", "auth-status", "loggedIn")
      .get("@dsoHeaderShadow")
      .find(".logout > button")
      .should("be.visible")
      // Show as <a>
      .get("dso-header")
      .invoke("attr", "login-url", "#login")
      .invoke("attr", "logout-url", "#logout")
      .invoke("attr", "auth-status", "loggedOut")
      .get("@dsoHeaderShadow")
      .find(".login > a")
      .should("be.visible")
      .get("dso-header")
      .invoke("attr", "auth-status", "loggedIn")
      .get("@dsoHeaderShadow")
      .find(".logout > a")
      .should("be.visible");
  });

  it("should show user home when url is provided", () => {
    cy.get("dso-header.hydrated")
      .then(($header: JQuery<HTMLDsoHeaderElement>) => setMenuItems($header, undefined))
      .invoke("attr", "user-home-url", "#userHomeUrl")
      .get("@dsoHeaderShadow")
      .find('li.menu-user-home a[href="#userHomeUrl"]')
      .should("be.visible");
  });

  it("should emit correct event details on select", () => {
    cy.get("dso-header.hydrated")
      .then(($header: JQuery<HTMLDsoHeaderElement>) => setMenuItems($header, defaultMenuItems))
      .invoke("attr", "user-home-url", "#userHomeUrl")
      .invoke("attr", "user-profile-url", "#profileUrl")
      .invoke("attr", "login-url", "#loginUrl")
      .invoke("attr", "logout-url", "#logoutUrl")
      .invoke("attr", "auth-status", "loggedOut")
      .invoke("attr", "show-help", true)
      .invoke("attr", "help-url", "#help")
      // MenuItem
      .get("@dsoHeaderShadow")
      .find('.dso-nav-main > li > a[href="#vergunningscheck"]')
      .click()
      .get("@headerListener")
      .its("lastCall.args.0.detail")
      .should("deep.contain", {
        isModifiedEvent: false,
        url: "#vergunningscheck",
        menuItem: {
          label: "Vergunningscheck",
          url: "#vergunningscheck",
        },
        type: "menuItem",
      })
      // User Home
      .get("@dsoHeaderShadow")
      .find(".menu-user-home > a")
      .click()
      .get("@headerListener")
      .its("lastCall.args.0.detail")
      .should("deep.contain", {
        isModifiedEvent: false,
        url: "#userHomeUrl",
        menuItem: undefined,
        type: "userHome",
      })
      // Login
      .get("@dsoHeaderShadow")
      .find(".login > a")
      .click()
      .get("@headerListener")
      .its("lastCall.args.0.detail")
      .should("deep.contain", {
        isModifiedEvent: false,
        url: "#loginUrl",
        menuItem: undefined,
        type: "login",
      })
      // Logout
      .get("dso-header")
      .invoke("attr", "auth-status", "loggedIn")
      .get("@dsoHeaderShadow")
      .find(".logout > a")
      .click()
      .get("@headerListener")
      .its("lastCall.args.0.detail")
      .should("deep.contain", {
        isModifiedEvent: false,
        url: "#logoutUrl",
        menuItem: undefined,
        type: "logout",
      })
      // Profile
      .get("@dsoHeaderShadow")
      .find(".dso-header-session .profile > a")
      .click()
      .get("@headerListener")
      .its("lastCall.args.0.detail")
      .should("deep.contain", {
        isModifiedEvent: false,
        url: "#profileUrl",
        menuItem: undefined,
        type: "profile",
      })
      // Help
      .get("@dsoHeaderShadow")
      .find(".dso-header-session .help > a")
      .click()
      .get("@headerListener")
      .its("lastCall.args.0.detail")
      .should("deep.contain", {
        isModifiedEvent: false,
        url: "#help",
        menuItem: undefined,
        type: "help",
      });
  });

  it("should be possible to make user home active", () => {
    cy.get("@dsoHeaderShadow")
      .find("nav li:first")
      .should("have.class", "dso-active")
      .find("a")
      .should("have.attr", "aria-current", "page")
      .and("have.css", "border-bottom", "4px solid rgb(139, 74, 106)")
      .get("dso-header")
      .invoke("attr", "user-home-active", "true")
      .get("dso-header")
      .then(($header) => {
        defaultMenuItems[0] = {
          label: "Home",
          url: "#home",
        };

        setMenuItems($header, defaultMenuItems);
      })
      .get("@dsoHeaderShadow")
      .find("nav li:first")
      .should("not.have.class", "dso-active")
      .find("a")
      .should("not.have.attr", "aria-current", "page")
      .and("not.have.css", "border-bottom", "4px solid rgb(139, 74, 106)")
      .get("@dsoHeaderShadow")
      .find("nav li.menu-user-home")
      .should("have.class", "dso-active")
      .find("a")
      .should("have.attr", "aria-current", "page")
      .and("have.css", "border-bottom", "4px solid rgb(139, 74, 106)");
  });

  // ToDo: #2693
  it.skip("shows Inloggen and Help or Profile, Uitloggen and Help", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-header--with-button-to-help");

    cy.get<HTMLDsoHeaderElement>("dso-header.hydrated")
      .then(($header) => setMenuItems($header, []))
      .matchImageSnapshot("Profile, Uitloggen and Help");

    cy.get("dso-header.hydrated").invoke("attr", "auth-status", "loggedOut").matchImageSnapshot("Inloggen and Help");
  });
});
