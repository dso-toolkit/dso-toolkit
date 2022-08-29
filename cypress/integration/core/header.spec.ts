describe("Header", () => {
  beforeEach(() => {
    cy.visit('http://localhost:56106/iframe.html?id=header--header');
  });

  const defaultMenuItems = [
    {
      label: 'Home',
      url: '#home',
      active: true,
    },
    {
      label: 'Vergunningscheck',
      url: '#vergunningscheck',
    },
    {
      label: 'Aanvragen',
      url: '#aanvragen',
    },
    {
      label: 'Regels op de kaart',
      url: '#regelsopdekaart',
    },
    {
      label: 'Maatregelen op maat',
      url: '#maatregelenopmaat',
    },
    {
      label: 'Hulpcentrum',
      url: '#hulpcentrum',
    },
  ];

  /** Configure the component and set an eventListener as @headerListener the `dso-header` is set as @dsoHeader and the `dso-header` shadow dom as @dsoHeaderShadow */
  function prepareComponent() {
    cy.get('dso-header')
      .as('dsoHeader')
      .then($header => {
        $header.on('headerClick', ($event: any) => {
          $event.detail.originalEvent.preventDefault();
        });
        $header.on('headerClick', cy.stub().as('headerListener'));
      })
      .shadow()
      .as('dsoHeaderShadow');
  }

  function setMenuItems($header: JQuery<HTMLElement>, items?: any[]) {
    const element = $header.get(0);

    if (element) {
      (element as any).mainMenu = items;
    }
  }

  it("should be accessible", () => {
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

  // https://github.com/dso-toolkit/dso-toolkit/issues/1717
  // it("should show/remove dropdownmenu", () => {
  //   cy.get("dso-header").shadow().find("nav").should("be.visible");
  //   cy.get("dso-header")
  //     .shadow()
  //     .find(".dropdown dso-dropdown-menu")
  //     .should("not.exist");
  //   cy.viewport(991, 600);
  //   cy.get("dso-header").shadow().find("nav").should("not.exist");
  //   cy.get("dso-header")
  //     .shadow()
  //     .find(".dropdown dso-dropdown-menu")
  //     .should("be.visible");
  //   cy.viewport(992, 600);
  //   cy.get("dso-header").shadow().find("nav").should("be.visible");
  //   cy.get("dso-header")
  //     .shadow()
  //     .find(".dropdown dso-dropdown-menu")
  //     .should("not.exist");
  // });

  // https://github.com/dso-toolkit/dso-toolkit/issues/1717
  // it("should show/remove overflowmenu", () => {
  //   cy.visit(
  //     "http://localhost:56106/iframe.html?id=header--header&args=useDropDownMenu:false"
  //   );
  //   cy.get("dso-header")
  //     .shadow()
  //     .find("nav ul li dso-dropdown-menu")
  //     .should("not.exist");
  //   cy.viewport(568, 600);
  //   cy.get("dso-header")
  //     .shadow()
  //     .find("nav ul li dso-dropdown-menu")
  //     .should("be.visible");
  //   cy.viewport(992, 600);
  //   cy.get("dso-header")
  //     .shadow()
  //     .find("nav ul li dso-dropdown-menu")
  //     .should("not.exist");
  // });

  it("should act on user-profile attributes", () => {
    cy.get("dso-header").invoke("attr", "auth-status", "loggedIn");
    cy.get("dso-header").shadow().find(".profile").should("be.visible");
    cy.get("dso-header").invoke("removeAttr", "user-profile-url");
    cy.get("dso-header").invoke("removeAttr", "user-profile-name");
    cy.get("dso-header").shadow().find(".profile").should("not.exist");
  });

  it("should act on user-home-url attribute", () => {
    cy.get("dso-header").invoke("attr", "auth-status", "loggedIn");
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

  it("should not show menu", () => {
    cy.visit(
      "http://localhost:56106/iframe.html?id=header--header&args=noMainMenu:true"
    );
    cy.get("dso-header").shadow().find("nav").should("not.exist");
    cy.get("dso-header").shadow().find("dso-dropdown-menu").should("not.exist");
  });

  it('should show login or logout when no menuItems are provided', () => {
    prepareComponent();

    cy.get('@dsoHeader')
      .then($header => setMenuItems($header, []))
      .invoke('attr', 'login-url', '#login')
      .invoke('attr', 'logout-url', '#logout')
      .invoke('attr', 'auth-status', 'loggedOut')
      .get('@dsoHeaderShadow')
      .find('.login > a').should('be.visible')
      .get('@dsoHeader')
      .invoke('attr', 'auth-status', 'loggedIn')
      .get('@dsoHeaderShadow')
      .find('.logout > a').should('be.visible');
  });

  it('should show correct login and logout when appropriate (and as anchors when url is provided)', () => {
    prepareComponent();

    cy.get('@dsoHeader')
      // Show as <button>
      .invoke('removeAttr', 'login-url')
      .invoke('removeAttr', 'logout-url')
      .invoke('attr', 'auth-status', 'loggedOut')
      .get('@dsoHeaderShadow')
      .find('.login > button').should('be.visible')
      .get('@dsoHeader')
      .invoke('attr', 'auth-status', 'loggedIn')
      .get('@dsoHeaderShadow')
      .find('.logout > button').should('be.visible')
      // Show as <a>
      .get('@dsoHeader')
      .invoke('attr', 'login-url', '#login')
      .invoke('attr', 'logout-url', '#logout')
      .invoke('attr', 'auth-status', 'loggedOut')
      .get('@dsoHeaderShadow')
      .find('.login > a').should('be.visible')
      .get('@dsoHeader')
      .invoke('attr', 'auth-status', 'loggedIn')
      .get('@dsoHeaderShadow')
      .find('.logout > a').should('be.visible');
  });

  it('should show user home when url is provided', () => {
    prepareComponent();

    cy.get('@dsoHeader')
      .then($header => setMenuItems($header, undefined))
      .invoke('attr', 'user-home-url', '#userHomeUrl')
      .get('@dsoHeaderShadow')
      .find('li.menu-user-home a[href="#userHomeUrl"]').should('be.visible');
  });

  it('should emit correct event details on select', () => {
    prepareComponent();

    cy.get('@dsoHeader')
      .then($header => setMenuItems($header, defaultMenuItems))
      .invoke('attr', 'user-home-url', '#userHomeUrl')
      .invoke('attr', 'user-profile-url', '#profileUrl')
      .invoke('attr', 'login-url', '#loginUrl')
      .invoke('attr', 'logout-url', '#logoutUrl')
      .invoke('attr', 'auth-status', 'loggedOut')
      // MenuItem
      .get('@dsoHeaderShadow')
      .find('.dso-nav-main > li > a[href="#vergunningscheck"]')
      .click()
      .get('@headerListener')
      .invoke('getCalls')
      .invoke('at', -1)
      .its('args.0.detail')
      .should('deep.contain', {
        isModifiedEvent: false,
        url: '#vergunningscheck',
        menuItem: {
          label: "Vergunningscheck",
          url: "#vergunningscheck",
        },
        type: 'menuItem',
      })
      // User Home
      .get('@dsoHeaderShadow')
      .find('.menu-user-home > a')
      .click()
      .get('@headerListener')
      .invoke('getCalls')
      .invoke('at', -1)
      .its('args.0.detail')
      .should('deep.contain', {
        isModifiedEvent: false,
        url: '#userHomeUrl',
        menuItem: undefined,
        type: 'userHome',
      })
      // Login
      .get('@dsoHeaderShadow')
      .find('.login > a')
      .click()
      .get('@headerListener')
      .invoke('getCalls')
      .invoke('at', -1)
      .its('args.0.detail')
      .should('deep.contain', {
        isModifiedEvent: false,
        url: '#loginUrl',
        menuItem: undefined,
        type: 'login',
      })
      // Logout
      .get('@dsoHeader')
      .invoke('attr', 'auth-status', 'loggedIn')
      .get('@dsoHeaderShadow')
      .find('.logout > a')
      .click()
      .get('@headerListener')
      .invoke('getCalls')
      .invoke('at', -1)
      .its('args.0.detail')
      .should('deep.contain', {
        isModifiedEvent: false,
        url: '#logoutUrl',
        menuItem: undefined,
        type: 'logout',
      })
      // Profile
      .get('@dsoHeaderShadow')
      .find('.dso-header-session .profile > a')
      .click()
      .get('@headerListener')
      .invoke('getCalls')
      .invoke('at', -1)
      .its('args.0.detail')
      .should('deep.contain', {
        isModifiedEvent: false,
        url: '#profileUrl',
        menuItem: undefined,
        type: 'profile',
      })
  });
});
