describe("Plekinfo Card", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-plekinfo-card--default")
      .get("dso-plekinfo-card.hydrated")
      .then(($card) => {
        $card.on("dsoPlekinfoCardClick", cy.stub().as("dsoPlekinfoCardClickListener"));
      });
  });

  it("should be accessible - default", () => {
    cy.injectAxe();
    cy.dsoCheckA11y("dso-plekinfo-card.hydrated");
  });

  it("screenshot", () => {
    cy.get("dso-plekinfo-card.hydrated").matchImageSnapshot();
  });

  it("should call dsoPlekinfoCardClick event when user clicks the title in the heading", () => {
    cy.get("dso-plekinfo-card.hydrated")
      .shadow()
      .find(".dso-plekinfo-card-heading > a")
      .realClick()
      .get("@dsoPlekinfoCardClickListener")
      .should("have.been.calledOnce");
  });

  it("should show different background-color when active='true'", () => {
    cy.get("dso-plekinfo-card.hydrated")
      .invoke("prop", "active", true)
      .shadow()
      .find(".dso-plekinfo-card-container")
      .should("have.css", "background-color", "rgb(229, 229, 229)");

    cy.get("dso-plekinfo-card.hydrated").matchImageSnapshot();
  });

  it("should show compact label with status='warning'", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-plekinfo-card--with-label")
      .get("dso-plekinfo-card.hydrated")
      .find("[slot='meta'] > dso-label[status='warning'][compact]")
      .should("exist");

    cy.get("dso-plekinfo-card.hydrated").matchImageSnapshot();
  });

  it("should show renvooi for changed title", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-plekinfo-card--with-name-change")
      .get("dso-plekinfo-card.hydrated")
      .find("[slot='heading'] > dso-renvooi")
      .should("exist");

    cy.get("dso-plekinfo-card.hydrated").matchImageSnapshot();
  });

  it("should be marked with wijzigactie='verwijder'", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-plekinfo-card--default")
      .get("dso-plekinfo-card.hydrated")
      .invoke("prop", "wijzigactie", "verwijder")
      .shadow()
      .find("del.dso-plekinfo-card-container")
      .should("exist");

    cy.get("dso-plekinfo-card.hydrated").matchImageSnapshot();

    cy.get("dso-plekinfo-card.hydrated")
      .invoke("prop", "active", true)
      .shadow()
      .find("del.dso-plekinfo-card-container")
      .should("have.css", "background-color", "rgb(245, 216, 220)");

    cy.get("dso-plekinfo-card.hydrated").matchImageSnapshot(`${Cypress.currentTest.title} -- active`);
  });

  it("should be marked with wijzigactie='voegtoe'", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-plekinfo-card--default")
      .get("dso-plekinfo-card.hydrated")
      .invoke("prop", "wijzigactie", "voegtoe")
      .shadow()
      .find("ins.dso-plekinfo-card-container")
      .should("exist");

    cy.get("dso-plekinfo-card.hydrated").matchImageSnapshot();

    cy.get("dso-plekinfo-card.hydrated")
      .invoke("prop", "active", true)
      .shadow()
      .find("ins.dso-plekinfo-card-container")
      .should("have.css", "background-color", "rgb(228, 241, 212)");

    cy.get("dso-plekinfo-card.hydrated").matchImageSnapshot(`${Cypress.currentTest.title} -- active`);
  });

  it("should show the title without an anchor", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-plekinfo-card--static")
      .get("dso-plekinfo-card.hydrated")
      .shadow()
      .find(".dso-plekinfo-card-heading > slot[name='heading']")
      .should("exist");

    cy.get("dso-plekinfo-card.hydrated").matchImageSnapshot();
  });

  it("should show a slide toggle", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-plekinfo-card--with-slide-toggle")
      .get("dso-plekinfo-card.hydrated")
      .find("dso-slide-toggle")
      .should("exist");

    cy.get("dso-plekinfo-card.hydrated").matchImageSnapshot();
  });

  it("should allow disabling stroke via showStroke property", () => {
    cy.get("dso-plekinfo-card.hydrated").as("plekinfoCard").invoke("prop", "showStroke", false);

    cy.get("@plekinfoCard")
      .shadow()
      .find(".dso-plekinfo-card-container")
      .should("have.css", "border-bottom-width", "0px");

    cy.get("@plekinfoCard").matchImageSnapshot(`${Cypress.currentTest.title} -- showStroke false`);
  });

  describe("Plekinfo Card Item", () => {
    it("should be accessible", () => {
      cy.injectAxe();
      cy.dsoCheckA11y("dso-plekinfo-card-item.hydrated");
    });

    it("should emit dsoPlekinfoCardItemHover when the user hovers the item", () => {
      cy.get("dso-plekinfo-card-item.hydrated")
        .then(($item) => {
          $item.on("dsoPlekinfoCardItemHover", cy.stub().as("hoverListener"));
        })
        .realHover()
        .get("@hoverListener")
        .should("have.been.calledOnce");
    });

    it("should emit dsoPlekinfoCardItemFocus when a slotted element receives focus", () => {
      cy.get("dso-plekinfo-card-item.hydrated")
        .then(($item) => {
          $item.on("dsoPlekinfoCardItemFocus", cy.stub().as("focusListener"));
        })
        .find("[slot='label']")
        .invoke("attr", "tabindex", "0")
        .focus()
        .get("@focusListener")
        .should("have.been.calledOnce");
    });

    it("should show a persistent background color when active", () => {
      cy.get("dso-plekinfo-card-item.hydrated")
        .invoke("prop", "active", true)
        .shadow()
        .find(".dso-plekinfo-card-item-container")
        .should("have.css", "background-color", "rgb(229, 229, 229)");
    });

    it("should be marked with wijzigactie='voegtoe' and show the active background color", () => {
      cy.visit("http://localhost:45000/iframe.html?id=core-plekinfo-card--added")
        .get("dso-plekinfo-card-item.hydrated")
        .shadow()
        .find("ins.dso-plekinfo-card-item-container")
        .should("exist")
        .should("have.css", "background-color", "rgb(228, 241, 212)");
    });

    it("should be marked with wijzigactie='verwijder' and show the active background color", () => {
      cy.visit("http://localhost:45000/iframe.html?id=core-plekinfo-card--deleted")
        .get("dso-plekinfo-card-item.hydrated")
        .shadow()
        .find("del.dso-plekinfo-card-item-container")
        .should("exist")
        .should("have.css", "background-color", "rgb(245, 216, 220)");
    });

    it("should render a dso-renvooi in the label when the name changed", () => {
      cy.visit("http://localhost:45000/iframe.html?id=core-plekinfo-card--label-change")
        .get("dso-plekinfo-card-item.hydrated")
        .find("dso-renvooi[slot='label']")
        .should("exist");
    });

    it("should not render a meta container when no meta slot is provided", () => {
      cy.visit("http://localhost:45000/iframe.html?id=core-plekinfo-card--sublist")
        .get("dso-plekinfo-card-item.hydrated")
        .first()
        .shadow()
        .find(".meta")
        .should("not.exist");
    });

    it("should render every item of a sublist", () => {
      cy.visit("http://localhost:45000/iframe.html?id=core-plekinfo-card--sublist")
        .get("dso-plekinfo-card-item.hydrated")
        .should("have.length", 3);
    });

    it("should keep the meta badge close to the label when there is no sublabel", () => {
      cy.get("dso-plekinfo-card-item.hydrated").find("[slot='sublabel']").invoke("remove");

      cy.get("dso-plekinfo-card-item.hydrated")
        .shadow()
        .find(".content")
        .should("have.class", "no-sublabel")
        .find(".meta")
        .should("have.css", "margin-inline-start", "0px");
    });
  });
});
