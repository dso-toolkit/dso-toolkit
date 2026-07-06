import { HeaderMenuItem } from "@dso-toolkit/core";
import { HeaderClickEvent, HeaderClickMenuItemEvent } from "@dso-toolkit/core/src/components/header/header.interfaces";

type TestHeaderClickMenuItemEvent = Omit<HeaderClickMenuItemEvent, "originalEvent">;
type TestHeaderClickEvent = Omit<HeaderClickEvent, "originalEvent">;

function setMenuItems($header: JQuery<HTMLDsoHeaderElement>, items?: HeaderMenuItem[]) {
  const element = $header.get(0);

  if (element) {
    element.mainMenu = items ?? [];
  }
}

describe("Header", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-header--with-label");

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

  function ensureCompactMenuOpen() {
    cy.get("dso-header[is-compact]")
      .shadow()
      .find(".dropdown-menu > button")
      .should("have.attr", "aria-expanded", "true");

    cy.get("dso-header[is-compact]")
      .shadow()
      .find(".dropdown-menu > div[popover=manual]")
      .then(($popover) => {
        const popover = $popover.get(0);

        if (!popover) {
          return;
        }

        if (typeof popover.showPopover === "function") {
          popover.showPopover();
        }

        if (getComputedStyle(popover).display === "none") {
          popover.style.display = "block";
        }
      })
      .should("be.visible");
  }

  it("matches snapshot (all menuitems visible)", () => {
    cy.viewport(1400, 660)
      .get<HTMLDsoHeaderElement>("dso-header.hydrated")
      .then(($header) => setMenuItems($header, defaultMenuItems))
      .get("@dsoHeaderShadow")
      .find(".dso-nav-main")
      .should("have.class", "ready")
      .get("@dsoHeaderShadow")
      .find(".dropdown-menu")
      .should("not.exist")
      .get("dso-header.hydrated")
      .matchImageSnapshot();
  });

  it("matches snapshot (compact)", () => {
    cy.viewport(1000, 660)
      .get<HTMLDsoHeaderElement>("dso-header.hydrated")
      .then(($header) => setMenuItems($header, defaultMenuItems))
      .invoke("prop", "compact", "always")
      .get("dso-header[is-compact]")
      .matchImageSnapshot();
  });

  it("should show and remove dropdownmenu", () => {
    cy.get("@dsoHeaderShadow")
      .find("nav")
      .should("be.visible")
      .get("@dsoHeaderShadow")
      .find(".dropdown .dropdown-menu")
      .should("not.exist")
      .viewport(991, 600)
      .get("@dsoHeaderShadow")
      .find("nav")
      .should("not.exist")
      .get("@dsoHeaderShadow")
      .find(".dropdown .dropdown-menu")
      .should("be.visible")
      .viewport(992, 600)
      .get("@dsoHeaderShadow")
      .find("nav")
      .should("be.visible")
      .get("@dsoHeaderShadow")
      .find(".dropdown .dropdown-menu")
      .should("not.exist");
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
      .find(".dropdown-menu")
      .should("not.exist");
  });

  it("shows Inloggen and Help or Profile, Uitloggen and Help", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-header--with-button-to-help");

    cy.get<HTMLDsoHeaderElement>("dso-header.hydrated")
      .then(($header) => setMenuItems($header, []))
      .matchImageSnapshot(`${Cypress.currentTest.title} -- Profile, Uitloggen and Help`);

    cy.get("dso-header.hydrated")
      .invoke("attr", "auth-status", "loggedOut")
      .matchImageSnapshot(`${Cypress.currentTest.title} -- Inloggen and Help`);
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.dsoCheckA11y("dso-header.hydrated");

    cy.get("dso-header.hydrated").invoke("attr", "compact", "always").dsoCheckA11y("dso-header.hydrated");

    cy.get("dso-header.hydrated")
      .viewport(400, 600)
      .get("dso-header")
      .invoke("attr", "compact", "auto")
      .dsoCheckA11y("dso-header.hydrated");
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
    cy.get<HTMLDsoHeaderElement>("dso-header.hydrated")
      .then(($header) => setMenuItems($header, undefined))
      .invoke("attr", "user-home-url", "#userHomeUrl")
      .get("@dsoHeaderShadow")
      .find('li.menu-user-home a[href="#userHomeUrl"]')
      .should("be.visible");
  });

  it("should emit correct event details on select", () => {
    cy.get<HTMLDsoHeaderElement>("dso-header.hydrated")
      .then(($header) => setMenuItems($header, defaultMenuItems))
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
        setMenuItems(
          $header,
          defaultMenuItems.map((menuItem) => ({ ...menuItem, active: false })),
        );
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

  describe('"overflowMenu" dropdown menu', () => {
    const overflowMenuItemEvents: TestHeaderClickMenuItemEvent[] = [
      {
        isModifiedEvent: false,
        url: "#maatregelenopmaat",
        menuItem: {
          label: "Maatregelen op maat",
          url: "#maatregelenopmaat",
        },
        type: "menuItem",
      },
      {
        isModifiedEvent: false,
        url: "#hulpcentrum",
        menuItem: {
          label: "Hulpcentrum",
          url: "#hulpcentrum",
        },
        type: "menuItem",
      },
    ];

    function overflowMenuItemTest(
      label: string,
      trigger: "click" | "realClick",
      menuItemEvent: TestHeaderClickMenuItemEvent | TestHeaderClickEvent,
    ) {
      it(`emits correct event details on select of overflow menu item ${label} via ${trigger}`, () => {
        cy.viewport(1000, 660);

        cy.get<HTMLDsoHeaderElement>("dso-header.hydrated")
          .then(($header) => setMenuItems($header, defaultMenuItems))
          .shadow()
          .as("headerShadow")
          .find(".dso-nav-main.ready .dropdown-menu-item")
          .find(".dropdown-menu")
          .should("exist")
          .and("be.visible");

        cy.get("@headerShadow").find(".dropdown-menu > button")[trigger]();

        cy.get("@headerShadow")
          .find(".dropdown-menu button[aria-expanded='true'] + div[popover=manual] > .dropdown-menu-options ul li")
          .contains(label)
          .should("be.visible")
          [trigger]()
          .get("@headerListener")
          .its("lastCall.args.0.detail")
          .should("deep.contain", menuItemEvent);
      });
    }

    for (const menuItemEvent of overflowMenuItemEvents) {
      overflowMenuItemTest(menuItemEvent.menuItem.label, "click", menuItemEvent);
      overflowMenuItemTest(menuItemEvent.menuItem.label, "realClick", menuItemEvent);
    }

    it("matches snapshot (2 menuitems in dropdown menu)", () => {
      cy.viewport(1000, 660);

      cy.get<HTMLDsoHeaderElement>("dso-header.hydrated")
        .then(($header) => setMenuItems($header, defaultMenuItems))
        .shadow()
        .find(".dso-nav-main.ready");

      cy.get("dso-header.hydrated")
        .shadow()
        .find(".dso-nav-main.ready")
        .find(".dropdown-menu-item")
        .find(".dropdown-menu")
        .should("exist")
        .and("be.visible");

      cy.get("@dsoHeaderShadow").find(".dropdown-menu-options ul li a").should("have.length", 2);

      cy.get("dso-header.hydrated").matchImageSnapshot();
    });
  });

  describe('emits correct event details from "compact menu" dropdown menu', () => {
    const compactMenuItemEvents: [label: string, TestHeaderClickMenuItemEvent | TestHeaderClickEvent][] = [
      [
        "Home",
        {
          type: "menuItem",
          isModifiedEvent: false,
          url: "#home",
          menuItem: {
            label: "Home",
            url: "#home",
            active: true,
          },
        },
      ],
      [
        "Vergunningscheck",
        {
          isModifiedEvent: false,
          url: "#vergunningscheck",
          menuItem: {
            label: "Vergunningscheck",
            url: "#vergunningscheck",
          },
          type: "menuItem",
        },
      ],
      [
        "Aanvragen",
        {
          isModifiedEvent: false,
          url: "#aanvragen",
          menuItem: {
            label: "Aanvragen",
            url: "#aanvragen",
          },
          type: "menuItem",
        },
      ],
      [
        "Regels op de kaart",
        {
          isModifiedEvent: false,
          url: "#regelsopdekaart",
          menuItem: {
            label: "Regels op de kaart",
            url: "#regelsopdekaart",
          },
          type: "menuItem",
        },
      ],
      [
        "Maatregelen op maat",
        {
          isModifiedEvent: false,
          url: "#maatregelenopmaat",
          menuItem: {
            label: "Maatregelen op maat",
            url: "#maatregelenopmaat",
          },
          type: "menuItem",
        },
      ],
      [
        "Hulpcentrum",
        {
          isModifiedEvent: false,
          url: "#hulpcentrum",
          menuItem: {
            label: "Hulpcentrum",
            url: "#hulpcentrum",
          },
          type: "menuItem",
        },
      ],
      [
        "Mijn Omgevingsloket",
        {
          isModifiedEvent: false,
          url: "#userHomeUrl",
          type: "userHome",
        },
      ],
      [
        "J.A. Jansen - Mijn profiel",
        {
          isModifiedEvent: false,
          url: "#profileUrl",
          type: "profile",
        },
      ],
      [
        "Uitloggen",
        {
          isModifiedEvent: false,
          url: "#logoutUrl",
          type: "logout",
        },
      ],
    ];

    function compactMenuItemTest(
      label: string,
      trigger: "click" | "realClick",
      menuItemEvent: Omit<HeaderClickMenuItemEvent | HeaderClickEvent, "originalEvent">,
    ) {
      it(`on select of compact menu item ${label} via ${trigger}`, () => {
        cy.get<HTMLDsoHeaderElement>("dso-header.hydrated")
          .then(($header) => setMenuItems($header, defaultMenuItems))
          .invoke("attr", "user-home-url", "#userHomeUrl")
          .invoke("attr", "user-profile-url", "#profileUrl")
          .invoke("attr", "login-url", "#loginUrl")
          .invoke("attr", "logout-url", "#logoutUrl")
          .invoke("attr", "auth-status", "loggedIn")
          .invoke("prop", "compact", "always")
          .get("dso-header[is-compact].hydrated")
          .shadow()
          .find(".dropdown .dropdown-menu")
          .should("exist")
          .and("be.visible");

        cy.get("dso-header[is-compact].hydrated").shadow().find(".dropdown-menu > button")[trigger]();

        ensureCompactMenuOpen();

        if (trigger === "click") {
          cy.get("dso-header[is-compact]")
            .shadow()
            .find(".dropdown-menu > div[popover=manual]")
            .contains("li", label)
            .find("a, button")
            .click({ force: true });
        } else {
          cy.get("dso-header[is-compact]")
            .shadow()
            .find(".dropdown-menu > div[popover=manual]")
            .contains("li", label)
            .find("a, button")
            .realClick();
        }

        cy.get("@headerListener")
          .should("have.been.called")
          .its("lastCall.args.0.detail")
          .should("deep.contain", menuItemEvent);
      });
    }

    for (const [label, menuItemEvent] of compactMenuItemEvents) {
      compactMenuItemTest(label, "click", menuItemEvent);
      compactMenuItemTest(label, "realClick", menuItemEvent);
    }

    it("keeps the focused menu item visible when the dropdown becomes scrollable", { browser: "!firefox" }, () => {
      const menuItems = Array.from({ length: 25 }, (_, i) => ({
        label: `Tab Item ${i + 1}`,
        url: `#tab-item-${i + 1}`,
      }));

      cy.viewport(320, 180);

      cy.get<HTMLDsoHeaderElement>("dso-header.hydrated")
        .then(($header) => setMenuItems($header, menuItems))
        .invoke("prop", "compact", "always");

      cy.get("dso-header[is-compact]").shadow().find(".dropdown-menu > button").as("compactMenuButton").click();

      ensureCompactMenuOpen();

      cy.get("dso-header[is-compact]")
        .shadow()
        .find(".dropdown-menu > div[popover=manual]")
        .as("scrollContainer")
        .should(($container) => {
          expect(Number.parseFloat($container.css("max-height"))).to.be.greaterThan(0);
          expect(Number.parseFloat($container.css("max-inline-size"))).to.be.greaterThan(0);
          expect($container.css("overflow-y")).to.eq("auto");
          expect($container[0]!.scrollHeight).to.be.greaterThan($container[0]!.clientHeight);
        });

      cy.get("@scrollContainer")
        .find(".dropdown-menu-options li a, .dropdown-menu-options li button")
        .as("menuActions");

      cy.get("@menuActions")
        .its("length")
        .then((count) => {
          for (const _ of Array.from({ length: count })) {
            cy.realPress("Tab");

            cy.focused().then(($focused) => {
              const focusedRect = $focused[0]!.getBoundingClientRect();

              cy.get("@scrollContainer").then(($container) => {
                const containerRect = $container[0]!.getBoundingClientRect();

                expect(focusedRect.top).to.be.at.least(containerRect.top - 1);
                expect(focusedRect.bottom).to.be.at.most(containerRect.bottom + 1);
              });
            });
          }
        });
    });
  });
});
