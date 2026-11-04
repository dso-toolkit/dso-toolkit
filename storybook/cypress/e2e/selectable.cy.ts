describe("Selectable", () => {
  it("should toggle info using instance method", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-selectable--with-info");

    cy.injectAxe();
    cy.dsoCheckA11y("dso-selectable.hydrated");

    cy.get("dso-selectable.hydrated").matchImageSnapshot();

    cy.get("dso-selectable .dso-rich-content").as("info-content").should("exist").and("not.be.visible");

    toggleInfo();
    cy.get("@info-content").should("be.visible");

    toggleInfo(false);
    cy.get("@info-content").should("not.be.visible");

    toggleInfo(true);
    cy.get("@info-content").should("be.visible");

    function toggleInfo(active?: boolean) {
      cy.get("dso-selectable").then(($s) => $s[0]!.toggleInfo(active));
    }
  });

  it("relates the info button to the info and reflects the expanded state", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-selectable--with-info");

    const infoButton = () =>
      cy.get("dso-selectable.hydrated dso-info-button").shadow().find("dso-icon-button").shadow().find("button");

    cy.get("dso-selectable.hydrated dso-info").then(([info]) => {
      infoButton().should(($button) => {
        expect($button).to.have.attr("aria-expanded", "false");
        expect($button).not.to.have.attr("aria-pressed");
        expect($button[0]?.ariaControlsElements).to.deep.equal([info]);
        expect($button[0]?.ariaDescribedByElements ?? []).to.have.length(0);
      });

      infoButton().realClick();
      cy.wrap(info).should("have.attr", "active");
      infoButton().should(($button) => {
        expect($button).to.have.attr("aria-expanded", "true");
        expect($button[0]?.ariaDescribedByElements).to.deep.equal([info]);
      });

      cy.injectAxe();
      cy.dsoCheckA11y("dso-selectable.hydrated");

      infoButton().realClick();
      cy.wrap(info).should("not.have.attr", "active");
      infoButton().should(($button) => {
        expect($button).to.have.attr("aria-expanded", "false");
        expect($button[0]?.ariaDescribedByElements ?? []).to.have.length(0);
      });
    });
  });

  it("labels the info close button with infoCloseLabel", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-selectable--with-info");

    const closeButton = () =>
      cy.get("dso-selectable.hydrated dso-info").shadow().find("dso-icon-button").shadow().find("button");

    closeButton().should("have.attr", "aria-label", "Sluit toelichting Label");

    cy.get("dso-selectable.hydrated").invoke("prop", "infoCloseLabel", "Sluit uitleg");

    closeButton().should("have.attr", "aria-label", "Sluit uitleg");

    cy.get<HTMLDsoSelectableElement>("dso-selectable.hydrated").then(
      ([selectable]) => (selectable!.infoCloseLabel = undefined),
    );

    closeButton().should("have.attr", "aria-label", "Sluiten");
  });

  it("returns focus to the info button when the info is closed", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-selectable--with-info");

    cy.get("dso-selectable.hydrated dso-info-button")
      .shadow()
      .find("dso-icon-button")
      .shadow()
      .find("button")
      .as("infoButton")
      .realClick();

    cy.get("dso-selectable.hydrated dso-info").should("have.attr", "active");
    cy.get("dso-selectable.hydrated dso-info").shadow().find("dso-icon-button").shadow().find("button").realClick();
    cy.get("dso-selectable.hydrated dso-info").should("not.have.attr", "active");

    cy.get("@infoButton").then(([button]) => {
      cy.get("dso-selectable.hydrated dso-info-button").should(([infoButton]) => {
        const iconButton = infoButton!.shadowRoot!.activeElement;

        expect(iconButton?.shadowRoot?.activeElement).to.equal(button);
      });
    });
  });

  it("supports controlled input", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-selectable--checkbox");

    cy.injectAxe();
    cy.dsoCheckA11y("dso-selectable.hydrated");

    cy.get("dso-selectable").invoke("prop", "checked", "true").find('input[type="checkbox"]').should("be.checked");

    cy.get("dso-selectable").click("left");

    cy.get("dso-selectable").find('input[type="checkbox"]').should("be.checked");
  });

  it("references the error message with aria-describedby", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-selectable--checkbox");

    cy.get("dso-selectable.hydrated").find("input").should("not.have.attr", "aria-describedby");

    cy.get("dso-selectable.hydrated").invoke("prop", "errormessage", "abc");

    cy.get("dso-selectable.hydrated").find("input").should("have.attr", "aria-describedby", "abc");
  });

  it("combines describedById and errormessage in aria-describedby", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-selectable--with-info");

    cy.get("dso-selectable.hydrated")
      .invoke("prop", "infoFixed", true)
      .invoke("prop", "describedById", "123")
      .invoke("prop", "errormessage", "abc");

    cy.get("dso-selectable.hydrated").find("input").should("have.attr", "aria-describedby", "123 abc");

    cy.get<HTMLDsoSelectableElement>("dso-selectable.hydrated").then(
      ($selectable) => ($selectable[0]!.errormessage = undefined),
    );

    cy.get("dso-selectable.hydrated").find("input").should("have.attr", "aria-describedby", "123");
  });

  it("supports uncontrolled input", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-selectable--checkbox");

    cy.get("dso-selectable")
      .should("not.have.a.property", "checked")
      .get("dso-selectable")
      .find('input[type="checkbox"]')
      .should("not.be.checked");

    cy.get("dso-selectable").click("left");

    cy.get("dso-selectable").find('input[type="checkbox"]').should("be.checked");
  });
});
