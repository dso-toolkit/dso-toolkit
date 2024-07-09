describe("Accordion", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-accordion--default");
  });

  it("emits toggleClick events when user activates handle", () => {
    cy.get("dso-accordion")
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
    cy.get("dso-accordion")
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
    cy.checkA11y("dso-accordion");

    cy.get("dso-accordion.hydrated, dso-accordion-section.hydrated")
      .should("exist")
      .get("dso-accordion.hydrated")
      .matchImageSnapshot({ failureThreshold: 0.001 });
  });

  it("should render handle as <a> when handleUrl is set", () => {
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
    const statusMap: Record<string, string> = {
      success: "succes:",
      info: "info:",
      warning: "waarschuwing:",
      error: "fout:",
    };

    Object.entries(statusMap).forEach(([key, text]) => {
      cy.get("dso-accordion")
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

    cy.get("dso-accordion")
      .find("dso-accordion-section")
      .first()
      .invoke("attr", "status-description", statusDescription)
      .shadow()
      .find(".dso-section-handle .dso-status")
      .should("contain.text", statusDescription);
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

  it("should focus handle element with AccordionSection.focusHandle()", () => {
    cy.get("dso-accordion-section")
      .invoke("get", 0)
      .as("section")
      .invoke("focusHandle")
      .get("@section")
      .should("have.focus");
  });

  it("should show a badge on an AccordionSection", () => {
    cy.get("dso-accordion")
      .find("dso-accordion-section:nth-child(2)")
      .as("accordionSection")
      .invoke("prop", "badgeStatus", undefined)
      .invoke("prop", "badgeMessage", undefined)
      .shadow()
      .find("dso-badge")
      .should("not.exist")
      .get("@accordionSection")
      .invoke("prop", "badgeStatus", "warning")
      .invoke("prop", "badgeMessage", "Bepaald")
      .shadow()
      .find("dso-badge")
      .as("dso-badge")
      .should("exist")
      .and("have.text", "Bepaald")
      .get("@dso-badge")
      .shadow()
      .find(".dso-badge.badge-warning")
      .should("exist");
  });
});
