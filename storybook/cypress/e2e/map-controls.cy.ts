import { BaseLayer, Overlay } from "@dso-toolkit/core";

// Sync with $transition-duration in map-controls.scss and map-controls.tsx
const transitionDuration = 300;

describe("Map Controls", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-map-controls--map-controls")
      .get("dso-map-controls.hydrated")
      .then(($mapControls) => {
        $mapControls.on("dsoZoomIn", cy.stub().as("dsoZoomIn"));
        $mapControls.on("dsoZoomOut", cy.stub().as("dsoZoomOut"));
        $mapControls.on("dsoToggle", cy.stub().as("dsoToggle"));
        $mapControls.on("dsoBaseLayerChange", cy.stub().as("dsoBaseLayerChange"));
        $mapControls.on("dsoToggleOverlay", cy.stub().as("dsoToggleOverlay"));
      })
      .shadow()
      .as("dsoMapControlsShadow")
      .find(".toggle-visibility-button")
      .as("toggleVisibilityButton");
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.dsoCheckA11y("dso-map-controls.hydrated");
  });

  it("shows a Button with Icon 'layers' and text 'Kaartlagen'", () => {
    cy.viewport(768, 660).get("@toggleVisibilityButton").matchImageSnapshot();
  });

  it("shows a Button with Icon 'layers' and text 'Map layers'", () => {
    cy.viewport(768, 660)
      .visit("http://localhost:45000/iframe.html?id=core-map-controls--map-controls&globals=locale:en")
      .get("dso-map-controls.hydrated")
      .shadow()
      .find(".toggle-visibility-button")
      .matchImageSnapshot();
  });

  it("shows an Icon Button with Icon 'layers' and attribute label='Kaartlagen`", () => {
    cy.viewport(767, 660)
      .get("dso-map-controls.hydrated")
      .shadow()
      .find(".toggle-visibility-icon-button")
      .should("have.attr", "label", "Kaartlagen")
      .matchImageSnapshot();
  });

  it("shows an Icon Button with Icon 'layers' and attribute label='Map layers`", () => {
    cy.viewport(767, 660)
      .visit("http://localhost:45000/iframe.html?id=core-map-controls--map-controls&globals=locale:en")
      .get("dso-map-controls.hydrated")
      .shadow()
      .find(".toggle-visibility-icon-button")
      .should("have.attr", "label", "Map layers");
  });

  it("should close layer info when layer becomes available", () => {
    cy.get("@toggleVisibilityButton").click();

    testLayer("dso-map-overlays", "overlays", "Riool");
    testLayer("dso-map-base-layers", "baseLayers", "Lavakaart");

    function testLayer<Layer extends Overlay | BaseLayer>(
      element: "dso-map-overlays" | "dso-map-base-layers",
      property: "overlays" | "baseLayers",
      label: string,
    ) {
      cy.get(element)
        .shadow()
        .contains("dso-selectable", label)
        .as("selectable")
        .find("dso-info-button")
        .shadow()
        .find("dso-icon-button")
        .click();

      cy.get("@selectable").find("dso-info").should("be.visible");

      // Emulate zoom change
      cy.get(element).invoke("prop", property, (_: unknown, layers: Layer[]) =>
        layers.map<Layer>((o) => (o.name === label ? { ...o, disabled: false } : o)),
      );

      cy.get("@selectable").find("dso-info").should("not.be.visible");
    }
  });

  it('panel should have Dutch header "Kaartlagen" and close button "Verberg paneel Kaartlagen"', () => {
    cy.get("@toggleVisibilityButton")
      .click()
      .wait(transitionDuration)
      .get("@dsoMapControlsShadow")
      .find("section header h2")
      .should("have.text", "Kaartlagen")
      .closest("header")
      .find("dso-icon-button")
      .should("be.visible")
      .and("have.attr", "label", "Verberg paneel Kaartlagen");

    cy.get("dso-map-controls.hydrated")
      .wait(300) // transitionDuration
      .matchImageSnapshot({ padding: [0, 16, 0, 100] });
  });

  it('panel should have English header "Map layers" and close button "Hide panel Map layers"', () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-map-controls--map-controls&globals=locale:en")
      .get("dso-map-controls.hydrated")
      .shadow()
      .as("dsoMapControlsShadow")
      .find(".toggle-visibility-button")
      .as("toggleVisibilityButton");

    cy.get("@toggleVisibilityButton")
      .click()
      .wait(transitionDuration)
      .get("@dsoMapControlsShadow")
      .find("section header h2")
      .should("have.text", "Map layers")
      .closest("header")
      .find("dso-icon-button")
      .should("be.visible")
      .and("have.attr", "label", "Hide panel Map layers");

    cy.get("dso-map-controls[open].hydrated")
      .wait(300) // transitionDuration
      .matchImageSnapshot({ padding: [0, 16, 0, 100] });
  });

  it("should render the panel as a named region", () => {
    cy.get("@toggleVisibilityButton")
      .click()
      .get("@dsoMapControlsShadow")
      .find("section")
      .should(($section) => {
        expect($section).not.to.have.attr("hidden");
        expect($section).to.have.attr("role", "region");
        expect($section).to.have.attr("aria-labelledby", "map-layers-panel");
      })
      .find("#map-layers-title")
      .should("have.text", "Kaartlagen");
  });

  it("should focus the close button when opening the panel and restore focus to the toggle button for each viewport", () => {
    [
      { width: 768, selector: ".toggle-visibility-button", assertion: "activeElement" },
      { width: 767, selector: ".toggle-visibility-icon-button", assertion: "focusWithin" },
    ].forEach(({ width, selector, assertion }) => {
      cy.viewport(width, 660);

      cy.visit("http://localhost:45000/iframe.html?id=core-map-controls--map-controls")
        .get("dso-map-controls.hydrated")
        .shadow()
        .as("dsoMapControlsShadow")
        .find(selector)
        .realClick();

      cy.get("dso-map-controls.hydrated").should("have.attr", "open");
      cy.get("dso-map-controls.hydrated").should(($mapControls) => {
        const closeButton = $mapControls[0].shadowRoot?.querySelector(".close-button");
        expect($mapControls[0].shadowRoot?.activeElement).to.equal(closeButton);
      });

      cy.get("@dsoMapControlsShadow").find(".close-button").realClick();

      cy.get("dso-map-controls.hydrated").should("not.have.attr", "open");

      if (assertion === "activeElement") {
        cy.get("dso-map-controls.hydrated").should(($mapControls) => {
          const toggleButton = $mapControls[0].shadowRoot?.querySelector(selector);
          expect($mapControls[0].shadowRoot?.activeElement).to.equal(toggleButton);
        });
      } else {
        cy.get("@dsoMapControlsShadow")
          .find(selector)
          .should(($toggleVisibilityIconButton) => {
            expect($toggleVisibilityIconButton[0].matches(":focus-within")).to.equal(true);
          });
      }
    });
  });

  it("should emit zoom events", () => {
    cy.get("@dsoMapControlsShadow")
      .find(".zoom-buttons")
      .as("zoomButtons")
      .find("dso-icon-button")
      .first()
      .should("have.attr", "label", "Zoom in")
      .click()
      .get("@dsoZoomIn")
      .should("have.been.calledOnce")
      .get("@zoomButtons")
      .find("dso-icon-button")
      .last()
      .should("have.attr", "label", "Zoom uit")
      .click()
      .get("@dsoZoomOut")
      .should("have.been.calledOnce");
  });

  it("should emit toggle events", () => {
    cy.get("@toggleVisibilityButton")
      .click()
      .get("@dsoToggle")
      .should("have.been.calledOnce")
      .and("have.been.calledWith", Cypress.sinon.match.object)
      .its("firstCall.args.0.detail")
      .should("deep.include", { open: true })
      .get("@dsoMapControlsShadow")
      .find(".close-button")
      .click()
      .get("@dsoToggle")
      .should("have.been.calledTwice")
      .and("have.been.calledWith", Cypress.sinon.match.object)
      .its("lastCall.args.0.detail")
      .should("deep.include", { open: false });
  });

  it("should emit dsoBaseLayerChange event", () => {
    cy.get("@toggleVisibilityButton")
      .click()
      .get("dso-map-base-layers")
      .shadow()
      .find(".form-group > .dso-field-container > dso-selectable")
      .first()
      .find(".dso-selectable-input-wrapper > input")
      .should("have.value", "Kaart")
      .click()
      .get("@dsoBaseLayerChange")
      .should("have.been.calledOnce")
      .and("have.been.calledWith", Cypress.sinon.match.object)
      .its("firstCall.args.0.detail")
      .should("deep.equal", { activeBaseLayer: { id: 0, name: "Kaart" } });
  });

  it("should emit dsoToggleOverlay event", () => {
    cy.get("@toggleVisibilityButton")
      .click()
      .get("dso-map-overlays")
      .shadow()
      .find(".form-group > .dso-field-container > dso-selectable")
      .first()
      .find(".dso-selectable-input-wrapper > input")
      .should("have.value", "Kadastrale grenzen")
      .click()
      .get("@dsoToggleOverlay")
      .should("have.been.calledOnce")
      .and("have.been.calledWith", Cypress.sinon.match.object)
      .its("firstCall.args.0.detail")
      .should("deep.equal", {
        checked: true,
        overlay: {
          id: 0,
          name: "Kadastrale grenzen",
        },
      })
      .get("dso-map-overlays")
      .shadow()
      .find(".form-group > .dso-field-container > dso-selectable")
      .eq(1)
      .find(".dso-selectable-input-wrapper > input")
      .should("have.value", "Basisregistratie Adressen en Gebouwen (BAG)")
      .click()
      .get("@dsoToggleOverlay")
      .should("have.been.calledTwice")
      .and("have.been.calledWith", Cypress.sinon.match.object)
      .its("lastCall.args.0.detail")
      .should("deep.equal", {
        checked: false,
        overlay: {
          id: 1,
          name: "Basisregistratie Adressen en Gebouwen (BAG)",
          checked: true,
        },
      });
  });
});
