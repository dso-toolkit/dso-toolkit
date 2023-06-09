import { HeaderMenuItem } from "../../../packages/core/src/components/header/header.interfaces";

describe("Header", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-header--with-sub-logo").injectAxe();
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
    cy.get("dso-header")
      .then(($header) => {
        $header.on("dsoHeaderClick", ($event) => {
          if ($event.originalEvent instanceof CustomEvent) {
            $event.originalEvent.detail.originalEvent.preventDefault();
          }
        });
        $header.on("dsoHeaderClick", cy.stub().as("headerListener"));
      })
      .as("dsoHeaderShadow");
  }

  function setMenuItems($header: JQuery<HTMLDsoHeaderElement>, items?: HeaderMenuItem[]) {
    const element = $header.get(0);

    if (element) {
      element.mainMenu = items;
    }
  }

  it("should be accessible", () => {
    cy.checkA11y("dso-header");
    cy.percySnapshot().get("dso-header").invoke("attr", "useDropDownMenu", "always").checkA11y("dso-header");
    cy.percySnapshot(`${Cypress.currentTest.title}" -- dropdown menu`)
      .viewport(400, 600)
      .get("dso-header")
      .invoke("attr", "useDropDownMenu", "auto")
      .checkA11y("dso-header");
  });

  it("should show/remove dropdownmenu", () => {
    cy.get("dso-header")
      .find("nav")
      .should("be.visible")
      .get("dso-header")
      .find(".dropdown dso-dropdown-menu")
      .should("not.exist")
      .viewport(991, 600)
      .get("dso-header")
      .find("nav")
      .should("not.exist")
      .get("dso-header")
      .find(".dropdown dso-dropdown-menu")
      .should("be.visible")
      .viewport(992, 600)
      .get("dso-header")
      .find("nav")
      .should("be.visible")
      .get("dso-header")
      .find(".dropdown dso-dropdown-menu")
      .should("not.exist");
  });

  it("should show/remove overflowmenu", () => {
    cy.viewport(1280, 600)
      .get("dso-header nav")
      .should("exist")
      .and("be.visible")
      .find("ul li dso-dropdown-menu")
      .should("not.exist")
      .and("be.null")
      .viewport(992, 600)
      .get("dso-header")
      .find("nav ul li dso-dropdown-menu")
      .should("exist")
      .and("be.visible")
      .viewport(568, 600)
      .get("dso-header")
      .find("nav ul li dso-dropdown-menu")
      .should("not.exist")
      .and("be.null");
  });

  it("should act on user-profile attributes", () => {
    cy.get("dso-header")
      .invoke("attr", "auth-status", "loggedIn")
      .find(".profile")
      .should("be.visible")
      .get("dso-header")
      .invoke("removeAttr", "user-profile-url")
      .invoke("removeAttr", "user-profile-name")
      .find(".profile")
      .should("not.exist");
  });

  it("should act on user-home-url attribute", () => {
    cy.get("dso-header")
      .invoke("attr", "auth-status", "loggedIn")
      .find("nav li.menu-user-home")
      .should("be.visible")
      .get("dso-header")
      .invoke("removeAttr", "user-home-url")
      .get("dso-header")
      .find("nav li.menu-user-home")
      .should("not.exist");
  });

  it("should not show menu", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-header--with-sub-logo&args=noMainMenu:true")
      .get("dso-header")
      .invoke("removeAttr", "user-home-url")
      .find("nav")
      .should("not.exist")
      .get("dso-header")
      .find("dso-dropdown-menu")
      .should("not.exist");
  });

  it("should show login or logout when no menuItems are provided", () => {
    prepareComponent();

    cy.get("dso-header")
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
    prepareComponent();

    cy.get("dso-header")
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
    prepareComponent();

    cy.get("dso-header")
      .then(($header) => setMenuItems($header, undefined))
      .invoke("attr", "user-home-url", "#userHomeUrl")
      .get("@dsoHeaderShadow")
      .find('li.menu-user-home a[href="#userHomeUrl"]')
      .should("be.visible");
  });

  it("should emit correct event details on select", () => {
    prepareComponent();

    cy.get("dso-header")
      .then(($header) => setMenuItems($header, defaultMenuItems))
      .invoke("attr", "user-home-url", "#userHomeUrl")
      .invoke("attr", "user-profile-url", "#profileUrl")
      .invoke("attr", "login-url", "#loginUrl")
      .invoke("attr", "logout-url", "#logoutUrl")
      .invoke("attr", "auth-status", "loggedOut")
      // MenuItem
      .get("@dsoHeaderShadow")
      .find('.dso-nav-main > li > a[href="#vergunningscheck"]')
      .click()
      .get("@headerListener")
      .invoke("getCalls")
      .invoke("at", -1)
      .its("args.0.detail")
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
      .invoke("getCalls")
      .invoke("at", -1)
      .its("args.0.detail")
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
      .invoke("getCalls")
      .invoke("at", -1)
      .its("args.0.detail")
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
      .invoke("getCalls")
      .invoke("at", -1)
      .its("args.0.detail")
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
      .invoke("getCalls")
      .invoke("at", -1)
      .its("args.0.detail")
      .should("deep.contain", {
        isModifiedEvent: false,
        url: "#profileUrl",
        menuItem: undefined,
        type: "profile",
      });
  });

  it("should be possible to make user home active", () => {
    cy.get("dso-header")
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
      .get("dso-header")
      .find("nav li:first")
      .should("not.have.class", "dso-active")
      .find("a")
      .should("not.have.attr", "aria-current", "page")
      .and("not.have.css", "border-bottom", "4px solid rgb(139, 74, 106)")
      .get("dso-header")
      .find("nav li.menu-user-home")
      .should("have.class", "dso-active")
      .find("a")
      .should("have.attr", "aria-current", "page")
      .and("have.css", "border-bottom", "4px solid rgb(139, 74, 106)");
  });
});
