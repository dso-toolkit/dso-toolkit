describe("Accordion", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-accordion--default")
      .get("dso-accordion")
      .then(($accordion) => {
        $accordion.on("dsoToggleSection", cy.stub().as("dsoToggleSectionListener"));
        $accordion.on("dsoToggleSectionAnimationEnd", cy.stub().as("dsoToggleSectionAnimationEndListener"));
      });
  });

  const prepareScrollIntoView = () => {
    cy.get("dso-accordion")
      .then(($accordion) => $accordion[0]?.closeOpenSections())
      .find("dso-accordion-section:nth-child(2)")
      .then(($element) => {
        $element.after(`<div class="cy-test-spacer" style="height: 1000px; background-color: yellow;"></div>`);
      })
      .wait(200);
  };

  it("should open and close a section by clicking the handle", () => {
    cy.percySnapshot();

    cy.get("dso-accordion")
      .then(($accordion) => $accordion[0]?.closeOpenSections())
      .find("dso-accordion-section")
      .first()
      .as("dsoAccordionSection")
      .should("not.have.attr", "open")
      .get("@dsoAccordionSection")
      .shadow()
      .find(".dso-section-handle")
      .realClick()
      .get("@dsoAccordionSection")
      .should("have.attr", "open")
      .get("@dsoAccordionSection")
      .shadow()
      .find(".dso-section-handle")
      .realClick()
      .get("@dsoAccordionSection")
      .should("not.have.attr", "open");
  });

  it("should open and close a section by index", () => {
    cy.get("dso-accordion")
      .then(($accordion) => $accordion[0]?.closeOpenSections())
      .find("dso-accordion-section")
      .first()
      .as("dsoAccordionSection")
      .should("not.have.attr", "open")
      .get("dso-accordion")
      .then(($accordion) => $accordion[0]?.toggleSection(0))
      .get("@dsoAccordionSection")
      .should("have.attr", "open")
      .get("dso-accordion")
      .then(($accordion) => $accordion[0]?.toggleSection(0))
      .get("@dsoAccordionSection")
      .should("not.have.attr", "open");
  });

  it("should open and close a section by element", () => {
    cy.get("dso-accordion")
      .then(($accordion) => $accordion[0]?.closeOpenSections())
      .find("dso-accordion-section")
      .first()
      .as("dsoAccordionSection")
      .should("not.have.attr", "open")
      .get("dso-accordion")
      .then(($accordion) => {
        const accordionElement = $accordion[0];
        const section = accordionElement.querySelector("dso-accordion-section");

        if (section) {
          return accordionElement.toggleSection(section);
        }
      })
      .get("@dsoAccordionSection")
      .should("have.attr", "open")
      .get("dso-accordion")
      .then(($accordion) => {
        const accordionElement = $accordion[0];
        const section = accordionElement.querySelector("dso-accordion-section");

        if (section) {
          return accordionElement.toggleSection(section);
        }
      })
      .get("@dsoAccordionSection")
      .should("not.have.attr", "open");
  });

  it("should open and close a section by calling toggleSection() on the section (+ a11y)", () => {
    cy.get("dso-accordion")
      .then(($accordion) => $accordion[0]?.closeOpenSections())
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
      .get("dso-accordion")
      .then(($accordion) => {
        const accordionElement = $accordion[0];
        const section = accordionElement.querySelector("dso-accordion-section");

        if (section) {
          return section.toggleSection();
        }
      })
      .get("@dsoAccordionSection")
      .should("have.attr", "open")
      .get("@dsoSectionHandle")
      .should("have.attr", "aria-expanded", "true")
      .get("@dsoSectionBody")
      .should("have.attr", "aria-hidden", "false")
      .get("dso-accordion")
      .then(($accordion) => {
        const accordionElement = $accordion[0];
        const section = accordionElement.querySelector("dso-accordion-section");

        if (section) {
          return section.toggleSection();
        }
      })
      .get("@dsoAccordionSection")
      .should("not.have.attr", "open")
      .get("@dsoSectionHandle")
      .should("have.attr", "aria-expanded", "true")
      .get("@dsoSectionBody")
      .should("have.attr", "aria-hidden", "false");
  });

  it("should keep only one section open when allowMultipleOpen = false", () => {
    cy.get("dso-accordion")
      .as("dsoAccordion")
      .invoke("removeAttr", "allowMultipleOpen")
      .get("dso-accordion")
      .then(($accordion) => $accordion[0]?.closeOpenSections())
      .then(async ($accordion) => await $accordion[0]?.toggleSection(0))
      .get("dso-accordion")
      .find("dso-accordion-section")
      .eq(0)
      .should("have.attr", "open")
      .get("dso-accordion")
      .then(async ($accordion) => await $accordion[0]?.toggleSection(1))
      .get("dso-accordion")
      .find("dso-accordion-section")
      .eq(0)
      .should("not.have.attr", "open")
      .get("dso-accordion")
      .find("dso-accordion-section")
      .eq(1)
      .should("have.attr", "open");
  });

  it("should keep allow multiple open sections when allowMultipleOpen = true", () => {
    cy.get("dso-accordion")
      .as("dsoAccordion")
      .invoke("attr", "allow-multiple-open", "")
      .get("dso-accordion")
      .then(($accordion) => $accordion[0]?.closeOpenSections())
      .then(async ($accordion) => await $accordion[0]?.toggleSection(0))
      .get("dso-accordion")
      .then(async ($accordion) => await $accordion[0]?.toggleSection(1))
      .get("dso-accordion")
      .find("dso-accordion-section")
      .eq(0)
      .should("have.attr", "open")
      .get("dso-accordion")
      .find("dso-accordion-section")
      .eq(1)
      .should("have.attr", "open");
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
      .invoke("removeAttr", "reverse-align")
      .find("dso-accordion-section")
      .shadow()
      .find(".dso-section-handle > button, .dso-section-handle > a")
      .as("dsoAccordionHandle")
      .find("dso-icon:first-child")
      .should("exist")
      .get("@dsoAccordion")
      .invoke("attr", "reverse-align", "")
      .get("@dsoAccordionHandle")
      .find("dso-icon:first-child")
      .should("not.exist")
      .get("@dsoAccordionHandle")
      .find("dso-icon:last-child")
      .should("exist");
  });

  it("emit dsoToggleSection event for all toggle methods", () => {
    // Click
    cy.get("dso-accordion")
      .then(($accordion) => $accordion[0]?.closeOpenSections())
      .find("dso-accordion-section")
      .first()
      .shadow()
      .find(".dso-section-handle")
      .realClick()
      .get("@dsoToggleSectionListener")
      .should("have.been.calledOnce")
      .invoke("getCalls")
      .invoke("at", -1)
      .its("args.0.detail.section.open")
      .should("equal", true)
      // Accordion.toggleSection(index)
      .get("dso-accordion")
      .then(($accordion) => $accordion[0]?.toggleSection(0))
      .get("@dsoToggleSectionListener")
      .should("have.been.calledTwice")
      .invoke("getCalls")
      .invoke("at", -1)
      .its("args.0.detail.section.open")
      .should("equal", false)
      .get("dso-accordion")
      // AccordionSection.toggleSection()
      .then(($accordion) => {
        const accordionElement = $accordion[0];
        const section = accordionElement.querySelector("dso-accordion-section");

        if (section) {
          return section.toggleSection();
        }
      })
      .get("@dsoToggleSectionListener")
      .should("have.been.calledThrice")
      .invoke("getCalls")
      .invoke("at", -1)
      .its("args.0.detail.section.open")
      .should("equal", true);
  });

  it("should scroll section into view when opened", () => {
    prepareScrollIntoView();
    cy.get("dso-accordion")
      .find("dso-accordion-section")
      .last()
      .shadow()
      .find(".dso-section-handle")
      .realClick()
      .window()
      .its("scrollY")
      .should("be.greaterThan", 600);
  });

  it("should scroll section into view when scrollSectionIntoView is called", () => {
    prepareScrollIntoView();
    cy.get("dso-accordion")
      .find<HTMLDsoAccordionSectionElement>("dso-accordion-section")
      .last()
      .then(($sections) => {
        const sectionElement = $sections[0];
        if ("scrollSectionIntoView" in sectionElement && typeof sectionElement.scrollSectionIntoView === "function") {
          sectionElement.scrollSectionIntoView();
        }
      })
      .window()
      .its("scrollY")
      .should("be.greaterThan", 560);
  });

  it("should scroll section into view when toggleSection is called", () => {
    prepareScrollIntoView();
    cy.get("dso-accordion")
      .find<HTMLDsoAccordionSectionElement>("dso-accordion-section")
      .last()
      .then(($sections) => {
        const sectionElement = $sections[0];
        if ("toggleSection" in sectionElement && typeof sectionElement.toggleSection === "function") {
          sectionElement.toggleSection();
        }
      })
      .window()
      .its("scrollY")
      .should("be.greaterThan", 600);
  });

  it("should NOT scroll section into view when toggleSection is called with param 'false'", () => {
    prepareScrollIntoView();
    cy.get("dso-accordion")
      .find<HTMLDsoAccordionSectionElement>("dso-accordion-section")
      .last()
      .then(($sections) => {
        const sectionElement = $sections[0];
        if ("toggleSection" in sectionElement && typeof sectionElement.toggleSection === "function") {
          sectionElement.toggleSection(false);
        }
      })
      .window()
      .its("scrollY")
      .should("equal", 0);
  });

  it("emit dsoToggleSectionEnd event for all toggle animations end", () => {
    cy.get("dso-accordion")
      .wait(1000)
      .find("dso-accordion-section")
      .first()
      .shadow()
      .find(".dso-section-handle")
      .realClick()
      .wait(1000)
      .get("@dsoToggleSectionAnimationEndListener")
      .should("have.been.calledTwice")
      .invoke("getCalls")
      .invoke("at", -1)
      .its("args.0.detail.section.open")
      .should("equal", true);
  });
});
