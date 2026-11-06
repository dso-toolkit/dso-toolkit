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

  it("should show hover background-color for wijzigactie='verwijder'", () => {
    cy.get("dso-plekinfo-card.hydrated")
      .invoke("prop", "wijzigactie", "verwijder")
      .shadow()
      .find(".dso-plekinfo-card-title > a")
      .realHover();

    cy.get("dso-plekinfo-card.hydrated")
      .shadow()
      .find("del.dso-plekinfo-card-container")
      .should("have.css", "background-color", "rgb(233, 205, 209)");
  });

  it("should show hover background-color for wijzigactie='voegtoe'", () => {
    cy.get("dso-plekinfo-card.hydrated")
      .invoke("prop", "wijzigactie", "voegtoe")
      .shadow()
      .find(".dso-plekinfo-card-title > a")
      .realHover();

    cy.get("dso-plekinfo-card.hydrated")
      .shadow()
      .find("ins.dso-plekinfo-card-container")
      .should("have.css", "background-color", "rgb(216, 229, 201)");
  });

  it("should call dsoPlekinfoCardClick event when user clicks the title in the heading", () => {
    cy.get("dso-plekinfo-card.hydrated")
      .shadow()
      .find(".dso-plekinfo-card-title > a")
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
      .should("have.css", "background-color", "rgb(221, 195, 198)");

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
      .should("have.css", "background-color", "rgb(206, 217, 191)");

    cy.get("dso-plekinfo-card.hydrated").matchImageSnapshot(`${Cypress.currentTest.title} -- active`);
  });

  it("should show the title without an anchor", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-plekinfo-card--static")
      .get("dso-plekinfo-card.hydrated")
      .shadow()
      .find(".dso-plekinfo-card-title > .heading-content > slot[name='heading']")
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

  it("shows content", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-plekinfo-card--with-content")
      .get("dso-plekinfo-card.hydrated")
      .matchImageSnapshot();
  });

  describe("Plekinfo Card Item (Integration)", () => {
    beforeEach(() => {
      cy.visit("http://localhost:45000/iframe.html?id=core-plekinfo-card--with-items");
    });

    it("should be accessible", () => {
      cy.injectAxe();
      cy.dsoCheckA11y("dso-plekinfo-card.hydrated");
    });

    it("should render label and sublabel together in one dso-truncate", () => {
      cy.get("dso-plekinfo-card.hydrated")
        .find("dso-plekinfo-card-item.hydrated")
        .first()
        .shadow()
        .find("dso-truncate")
        .should("have.length", 1)
        .find('slot[name="label"] ~ slot[name="sublabel"]')
        .should("exist");

      cy.get("dso-plekinfo-card.hydrated").matchImageSnapshot();
    });

    [
      { wijzigactie: "voegtoe", element: "ins", backgroundColor: "rgb(228, 241, 212)" },
      { wijzigactie: "verwijder", element: "del", backgroundColor: "rgb(245, 216, 220)" },
    ].forEach(({ wijzigactie, element, backgroundColor }) => {
      it(`should show renvooi background over the entire card with wijzigactie='${wijzigactie}'`, () => {
        // Move the mouse away from the heading anchor, to prevent hover styling from previous tests
        cy.get("body").realMouseMove(0, 0, { position: "topLeft" });

        cy.get("dso-plekinfo-card.hydrated dso-plekinfo-card-item.hydrated").should("have.length.at.least", 1);

        cy.get("dso-plekinfo-card.hydrated")
          .invoke("prop", "wijzigactie", wijzigactie)
          .shadow()
          .find(`${element}.dso-plekinfo-card-container`)
          .should("have.css", "display", "block")
          .and("have.css", "background-color", backgroundColor)
          .then(($container) => {
            const containerRect = $container[0].getBoundingClientRect();

            cy.get("dso-plekinfo-card.hydrated").then(($card) => {
              const cardRect = $card[0].getBoundingClientRect();

              expect(containerRect.width).to.equal(cardRect.width);
              expect(containerRect.height).to.equal(cardRect.height);
            });
          });

        cy.get("dso-plekinfo-card.hydrated").matchImageSnapshot();
      });
    });

    it("should show label and sublabel in the tooltip when the text is truncated", () => {
      cy.get("dso-plekinfo-card.hydrated").invoke("css", "inline-size", "280px");

      cy.get("dso-plekinfo-card.hydrated")
        .find("dso-plekinfo-card-item.hydrated")
        .eq(2)
        .shadow()
        .find("dso-truncate")
        .shadow()
        .find(".dso-truncate-content")
        .should("have.attr", "tabindex", "0")
        .focus();

      cy.get("dso-plekinfo-card.hydrated")
        .find("dso-plekinfo-card-item.hydrated")
        .eq(2)
        .shadow()
        .find("dso-truncate")
        .shadow()
        .find(".dso-tooltip")
        .should("be.visible")
        .and("contain.text", "toegestaan")
        .and("contain.text", "in: bebouwde kom, industriezone, dijkgebied");
    });
  });
});
