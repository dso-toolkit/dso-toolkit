import { BaseLayer, Overlay } from "@dso-toolkit/core";

describe("Map Controls", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-map-controls--map-controls")
      .get("dso-map-controls")
      .then(($mapControls) => {
        $mapControls.on("dsoZoomIn", cy.stub().as("dsoZoomIn"));
        $mapControls.on("dsoZoomOut", cy.stub().as("dsoZoomOut"));
        $mapControls.on("dsoToggle", cy.stub().as("dsoToggle"));
        $mapControls.on("dsoBaseLayerChange", cy.stub().as("dsoBaseLayerChange"));
        $mapControls.on("dsoToggleOverlay", cy.stub().as("dsoToggleOverlay"));
      })
      .shadow()
      .as("dsoMapControlsShadow")
      .find("#toggle-visibility-button")
      .as("toggleVisibilityButton");
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
        .find("button")
        .click();

      cy.get("@selectable").find("dso-info").should("be.visible");

      // Emulate zoom change
      cy.get(element).invoke("prop", property, (_: unknown, layers: Layer[]) =>
        layers.map<Layer>((o) => (o.name === label ? { ...o, disabled: false } : o)),
      );

      cy.get("@selectable").find("dso-info").should("not.be.visible");
    }
  });

  it('panel should have header "Kaartlagen" and close button "Verberg paneel Kaartlagen"', () => {
    cy.get("@toggleVisibilityButton")
      .click()
      .get("@dsoMapControlsShadow")
      .find("section header h2")
      .should("have.text", "Kaartlagen")
      .closest("header")
      .find("button span")
      .should("have.text", "Verberg paneel Kaartlagen");

    cy.get("dso-map-controls.hydrated").matchImageSnapshot();
  });

  it("should emit zoom events", () => {
    cy.get("@dsoMapControlsShadow")
      .find(".zoom-buttons")
      .as("zoomButtons")
      .find("button")
      .first()
      .should("have.text", "Zoom in")
      .click()
      .get("@dsoZoomIn")
      .should("have.been.calledOnce")
      .get("@zoomButtons")
      .find("button")
      .last()
      .should("have.text", "Zoom uit")
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
