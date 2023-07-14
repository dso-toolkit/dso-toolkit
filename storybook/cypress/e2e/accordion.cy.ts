describe("Accordion", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-accordion--default")
      .get("dso-accordion")
      .then(($accordion) => {
        $accordion.on("dsoToggleSection", cy.stub().as("dsoToggleSectionListener"));
        $accordion.on("dsoToggleSectionAnimationEnd", cy.stub().as("dsoToggleSectionAnimationEndListener"));
      });
  });

  const closeOpenSections = () => {
    cy.get("dso-accordion").find("dso-accordion-section[open]").invoke("prop", "open", false);
  };

  it("should open and close a section by clicking the handle", () => {
    cy.percySnapshot();

    closeOpenSections();

    cy.get("dso-accordion")
      .find("dso-accordion-section")
      .first()
      .as("dsoAccordionSection")
      .should("not.have.attr", "open")
      .get("@dsoAccordionSection")
      .shadow()
      .find(".dso-section-handle")
      .click()
      .get("@dsoAccordionSection")
      .should("have.attr", "open")
      .get("@dsoAccordionSection")
      .shadow()
      .find(".dso-section-handle")
      .realClick()
      .get("@dsoAccordionSection")
      .should("not.have.attr", "open");
  });

  it("should be accessible", () => {
    cy.get("dso-accordion")
      .find("dso-accordion-section")
      .first()
      .as("dsoAccordionSection")
      .shadow()
      .find(".dso-section-handle > button, .dso-section-handle > a")
      .as("dsoSectionHandle")
      .get("@dsoAccordionSection")
      .should("not.have.attr", "open")
      .get("@dsoSectionHandle")
      .should("have.attr", "aria-expanded", "false")
      .get("@dsoAccordionSection")
      .shadow()
      .find(".dso-section-body")
      .as("dsoSectionBody")
      .should("have.attr", "aria-hidden", "true")
      .get("@dsoSectionHandle")
      .click()
      .get("@dsoAccordionSection")
      .should("have.attr", "open")
      .get("@dsoSectionHandle")
      .should("have.attr", "aria-expanded", "true")
      .get("@dsoSectionBody")
      .should("have.attr", "aria-hidden", "false")
      .get("@dsoSectionHandle")
      .click()
      .get("@dsoAccordionSection")
      .should("not.have.attr", "open")
      .get("@dsoSectionHandle")
      .should("have.attr", "aria-expanded", "false")
      .get("@dsoSectionBody")
      .should("have.attr", "aria-hidden", "true");
  });

  it("should render handle as <a> when href is set", () => {
    const href = "#hekkie";

    cy.get("dso-accordion")
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
      cy.get("dso-accordion")
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
    const stateMap: Record<string, string> = {
      success: "succes:",
      info: "info:",
      warning: "waarschuwing:",
      error: "fout:",
    };

    Object.entries(stateMap).forEach(([key, text]) => {
      cy.get("dso-accordion")
        .find("dso-accordion-section")
        .first()
        .invoke("attr", "state", key)
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

  it("should render status", () => {
    const status = "5 van 8 antwoorden beantwoord";

    cy.get("dso-accordion")
      .find("dso-accordion-section")
      .first()
      .invoke("attr", "status", status)
      .shadow()
      .find(".dso-section-handle .dso-status")
      .should("contain.text", status);
  });

  it("should render the handle correctly in reverseAlign mode", () => {
    cy.get("dso-accordion")
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
      .find("dso-icon:first-child")
      .should("not.exist")
      .get("@dsoAccordionHandle")
      .find("dso-icon:last-child")
      .should("exist");
  });

  it("emit dsoToggleSection and dsoToggleSectionAnimationEnd events", () => {
    closeOpenSections();

    cy.get("dso-accordion")
      .wait(1500)
      .find("dso-accordion-section")
      .first()
      .shadow()
      .find(".dso-section-handle")
      .click()
      .get("@dsoToggleSectionListener")
      .should("have.been.calledOnce")
      .invoke("getCalls")
      .invoke("at", -1)
      .its("args.0.detail.section.open")
      .should("equal", false)
      .wait(260) // animation time
      .get("@dsoToggleSectionAnimationEndListener")
      .should("have.been.calledOnce")
      .invoke("getCalls")
      .invoke("at", -1)
      .its("args.0.detail.section.open")
      .should("equal", true);
  });
});
