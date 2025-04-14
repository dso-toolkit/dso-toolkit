describe("Accordion", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-accordion--default");
  });

  it("emits toggleClick events when user activates handle", () => {
    cy.get("dso-accordion.hydrated")
      .find("dso-accordion-section:nth-child(2)")
      .as("accordionSection")
      .then(($accordionSection) => {
        $accordionSection.on("dsoToggleClick", cy.stub().as("dsoToggleClick"));
      })
      .shadow()
      .find(".dso-section-handle")
      .click()
      .get("@dsoToggleClick")
      .should("be.calledOnce")
      .invoke("getCalls")
      .invoke("at", -1)
      .its("args.0.detail")
      .as("detail")
      .its("open")
      .should("eq", true)
      .get("@detail")
      .its("originalEvent")
      .should("exist");
  });

  it("emits dsoAnimationEnd events when user activates handle", () => {
    cy.get("dso-accordion.hydrated")
      .find("dso-accordion-section:nth-child(2)")
      .as("accordionSection")
      .invoke("prop", "open")
      .should("equal", false)
      .get("@accordionSection")
      .shadow()
      .find("dso-expandable")
      .should("have.class", "dso-animate-ready")
      .get("@accordionSection")
      .then(($accordionSection) => {
        $accordionSection.on("dsoAnimationEnd", cy.stub().as("dsoAnimationEnd"));
      })
      .shadow()
      .find(".dso-section-handle")
      .click()
      .get("@accordionSection")
      .invoke("prop", "open", true)
      .get("@dsoAnimationEnd")
      .should("be.calledOnce")
      .invoke("getCalls")
      .invoke("at", -1)
      .its("args.0.detail")
      .as("detail")
      .its("open")
      .should("equal", true)
      .get("@detail")
      .its("scrollIntoView")
      .should("exist");
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.dsoCheckA11y("dso-accordion.hydrated");

    cy.get("dso-accordion.hydrated, dso-accordion-section.hydrated")
      .should("exist")
      .get("dso-accordion.hydrated")
      .matchImageSnapshot({ failureThreshold: 0.001 });
  });

  it("should render handle as <a> when handleUrl is set", () => {
    const href = "#hekkie";

    cy.get("dso-accordion.hydrated")
      .find("dso-accordion-section")
      .first()
      .as("dsoAccordionSection")
      .shadow()
      .find(".dso-section-handle > button")
      .should("exist")
      .get("@dsoAccordionSection")
      .invoke("attr", "handle-url", href)
      .shadow()
      .find(".dso-section-handle > a")
      .should("have.attr", "href", href);
  });

  it("should render the correct heading element", () => {
    const headings = ["h2", "h3", "h4", "h5"];

    headings.forEach((heading) => {
      cy.get("dso-accordion.hydrated")
        .find("dso-accordion-section")
        .first()
        .invoke("attr", "heading", heading)
        .as("dsoAccordionSection")
        .shadow()
        .find(`${heading}.dso-section-handle`)
        .should("exist");
    });
  });

  it("should render state icon and text", () => {
    const statusMap: Record<string, string> = {
      success: "succes:",
      info: "info:",
      warning: "waarschuwing:",
      error: "fout:",
    };

    Object.entries(statusMap).forEach(([key, text]) => {
      cy.get("dso-accordion.hydrated")
        .find("dso-accordion-section")
        .first()
        .invoke("attr", "status", key)
        .shadow()
        .find(".dso-section-handle > button, .dso-section-handle > a")
        .as("dsoAccordionHandle")
        .find("span.sr-only")
        .should("contain.text", text)
        .get("@dsoAccordionHandle")
        .find(".dso-section-handle-addons dso-icon")
        .should("have.prop", "icon", `status-${key}`);
    });
  });

  it("should render statusDescription", () => {
    const statusDescription = "5 van 8 antwoorden beantwoord";

    cy.get("dso-accordion.hydrated")
      .find("dso-accordion-section")
      .first()
      .as("accordionSection")
      .invoke("attr", "status-description", statusDescription)
      .shadow()
      .find(".dso-section-handle .dso-status")
      .should("contain.text", statusDescription);

    cy.get("@accordionSection").matchImageSnapshot(`${Cypress.currentTest.title} -- status description`);
  });

  it("should render the handle correctly in reverseAlign mode", () => {
    cy.get("dso-accordion.hydrated")
      .as("dsoAccordion")
      .find("dso-accordion-section")
      .shadow()
      .find(".dso-section-handle > button, .dso-section-handle > a")
      .as("dsoAccordionHandle")
      .find("dso-icon:first-child")
      .should("exist")
      .get("@dsoAccordion")
      .invoke("prop", "reverseAlign")
      .should("eq", false)
      .get("@dsoAccordion")
      .invoke("attr", "reverse-align", "")
      .invoke("prop", "reverseAlign")
      .should("eq", true)
      .get("@dsoAccordionHandle")
      .children("dso-icon")
      .should("not.exist")
      .get("@dsoAccordionHandle")
      .find(".dso-section-handle-addons")
      .children("dso-icon")
      .should("exist");

    cy.get("@dsoAccordion").matchImageSnapshot(`${Cypress.currentTest.title} -- reverse-align mode`);
  });

  it("should focus handle element with AccordionSection.focusHandle()", () => {
    cy.get("dso-accordion-section")
      .invoke("get", 0)
      .as("section")
      .invoke("focusHandle")
      .get("@section")
      .should("have.focus");
  });

  it("should show a label on an AccordionSection", () => {
    cy.get("dso-accordion")
      .find("dso-accordion-section:nth-child(2)")
      .as("accordionSection")
      .invoke("prop", "labelStatus", undefined)
      .invoke("prop", "label", undefined)
      .shadow()
      .find("dso-label")
      .should("not.exist")
      .get("@accordionSection")
      .invoke("prop", "labelStatus", "warning")
      .invoke("prop", "label", "Bepaald")
      .shadow()
      .find("dso-label")
      .as("dso-label")
      .should("exist")
      .and("have.text", "Bepaald")
      .get("@dso-label")
      .shadow()
      .find(".dso-label.dso-label-warning")
      .should("exist");
  });

  it("should render renvooi in the section-handle", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-accordion--compact-black");

    cy.get("dso-accordion.hydrated")
      .find("dso-accordion-section:nth-child(2)")
      .as("accordionSection")
      .shadow()
      .find("dso-renvooi")
      .shadow()
      .find("span.text")
      .should("exist")
      .get("@accordionSection")
      .invoke("prop", "handleTitle", { toegevoegd: "Dit is toegevoegde tekst" })
      .shadow()
      .find("dso-renvooi")
      .shadow()
      .find("ins")
      .should("exist")
      .and("have.text", "Dit is toegevoegde tekst");

    cy.get("@accordionSection").matchImageSnapshot(`${Cypress.currentTest.title} -- toegevoegde tekst`);

    cy.get("@accordionSection")
      .invoke("prop", "handleTitle", { verwijderd: "Dit is verwijderde tekst" })
      .shadow()
      .find("dso-renvooi")
      .shadow()
      .find("del")
      .should("exist")
      .and("have.text", "Dit is verwijderde tekst");

    cy.get("@accordionSection").matchImageSnapshot(`${Cypress.currentTest.title} -- verwijderde tekst`);

    cy.get("@accordionSection")
      .invoke("prop", "handleTitle", { was: "Dit was de tekst", wordt: "Dit is de tekst" })
      .shadow()
      .find("dso-renvooi")
      .shadow()
      .find("del")
      .should("exist")
      .and("have.text", "Dit was de tekst")
      .get("@accordionSection")
      .shadow()
      .find("dso-renvooi")
      .shadow()
      .find("ins")
      .should("exist")
      .and("have.text", "Dit is de tekst");

    cy.get("@accordionSection").matchImageSnapshot(`${Cypress.currentTest.title} -- was wordt`);

    cy.get("@accordionSection")
      .invoke("prop", "handleTitle", [
        { was: "Dit was de tekst", wordt: "Dit is de tekst" },
        {
          toegevoegd: "Nog meer toegevoegde tekst",
        },
      ])
      .shadow()
      .find("dso-renvooi")
      .should("exist")
      .shadow()
      .find("del")
      .and("have.text", "Dit was de tekst")
      .get("@accordionSection")
      .shadow()
      .find("dso-renvooi")
      .shadow()
      .find("ins")
      .eq(0)
      .should("exist")
      .and("have.text", "Dit is de tekst")
      .get("@accordionSection")
      .shadow()
      .find("dso-renvooi")
      .shadow()
      .find("ins")
      .eq(1)
      .should("exist")
      .and("have.text", "Nog meer toegevoegde tekst");

    cy.get("@accordionSection").matchImageSnapshot(`${Cypress.currentTest.title} -- was wordt toegevoegd`);
  });

  it("should render wijzigactie in the section", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-accordion--compact-black");

    cy.get("dso-accordion.hydrated")
      .find("dso-accordion-section:nth-child(1)")
      .as("accordionSection")
      .invoke("prop", "wijzigactie", "voegtoe")
      .should("have.class", "dso-accordion-wijzigactie-voegtoe")
      .matchImageSnapshot(`${Cypress.currentTest.title} -- Toegevoegd`)
      .get("@accordionSection")
      .invoke("prop", "wijzigactie", "verwijder")
      .should("have.class", "dso-accordion-wijzigactie-verwijder")
      .matchImageSnapshot(`${Cypress.currentTest.title} -- Verwijderd`);
  });

  describe("Nested", () => {
    it("shows a nested accordion", () => {
      cy.visit("http://localhost:45000/iframe.html?id=core-accordion--nested");

      cy.get("dso-accordion.hydrated:has(dso-accordion.hydrated)").should("exist").matchImageSnapshot();
    });
  });

  describe("Activatable", () => {
    beforeEach(() => {
      cy.visit("http://localhost:45000/iframe.html?id=core-accordion--activatable");

      cy.get("dso-accordion.hydrated")
        .find("dso-accordion-section:nth-child(2)")
        .as("accordionSection")
        .then(($accordionSection) => {
          $accordionSection.on("dsoActiveChange", cy.stub().as("dsoActiveChange"));
        });
    });

    it("shows a Slide Toggle", () => {
      cy.get("dso-accordion.hydrated").should("exist").matchImageSnapshot();

      cy.get("@accordionSection").shadow().find("dso-slide-toggle").should("exist");
    });

    it("does not show a Slide Toggle", () => {
      cy.get("@accordionSection")
        .invoke("prop", "activatable", "false")
        .shadow()
        .find("dso-slide-toggle")
        .should("not.exist");
    });

    it("emits dsoActiveChange with current true and next false", () => {
      cy.get("@accordionSection")
        .shadow()
        .find("dso-slide-toggle")
        .should("exist")
        .click()
        .get("@dsoActiveChange")
        .should("be.calledOnce")
        .invoke("getCalls")
        .invoke("at", -1)
        .its("args.0.detail")
        .as("detail")
        .its("current")
        .should("be.true")
        .get("@detail")
        .its("next")
        .should("be.false")
        .get("@detail")
        .its("originalEvent")
        .should("exist");
    });

    it("emits dsoActiveChange with current false and next true", () => {
      cy.get("@accordionSection")
        .invoke("prop", "active", "false")
        .shadow()
        .find("dso-slide-toggle")
        .should("exist")
        .click()
        .get("@dsoActiveChange")
        .should("be.calledOnce")
        .invoke("getCalls")
        .invoke("at", -1)
        .its("args.0.detail")
        .as("detail")
        .its("current")
        .should("be.false")
        .get("@detail")
        .its("next")
        .should("be.true")
        .get("@detail")
        .its("originalEvent")
        .should("exist");
    });
  });
});
