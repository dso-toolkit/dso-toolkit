import { BaseLayer } from "../../../packages/core/src/components/map-base-layers/map-base-layers.interfaces";
import { Overlay } from "../../../packages/core/src/components/map-overlays/map-overlays.interfaces";

describe("Map Controls V2", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-map-controls-v2--sidebar")
      .get("dso-map-controls-buttons")
      .then(($mapControlsButtons) => {
        $mapControlsButtons.on("dsoZoomIn", cy.stub().as("dsoZoomIn"));
        $mapControlsButtons.on("dsoZoomOut", cy.stub().as("dsoZoomOut"));
        $mapControlsButtons.on("dsoToggle", cy.stub().as("dsoToggle"));
      })
      .shadow()
      .as("dsoMapControlsButtonsShadow")
      .find("#toggle-visibility-button")
      .as("toggleVisibilityButton")
      .get("dso-map-controls-panel")
      .then(($mapControlsPanel) => {
        $mapControlsPanel.on("dsoClose", cy.stub().as("dsoClose"));
        $mapControlsPanel.on("dsoBaseLayerChange", cy.stub().as("dsoBaseLayerChange"));
        $mapControlsPanel.on("dsoToggleOverlay", cy.stub().as("dsoToggleOverlay"));
      })
      .shadow()
      .as("dsoMapControlsPanelShadow");
  });

  it("should close layer info when layer becomes available", () => {
    cy.get("@toggleVisibilityButton")
      .click()
      .get("dso-map-controls-buttons")
      .invoke("attr", "open", "")
      .get("dso-map-controls-panel")
      .invoke("attr", "open", "");

    testLayer("dso-map-overlays", "overlays", "Riool");
    testLayer("dso-map-base-layers", "baseLayers", "Lavakaart");

    function testLayer<Layer extends Overlay | BaseLayer>(
      element: "dso-map-overlays" | "dso-map-base-layers",
      property: "overlays" | "baseLayers",
      label: string
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
        layers.map<Layer>((o) => (o.name === label ? { ...o, disabled: false } : o))
      );

      cy.get("@selectable").find("dso-info").should("not.be.visible");
    }
  });

  it('panel should have header "Kaartlagen" and close button "Verberg paneel Kaartlagen"', () => {
    cy.get("@toggleVisibilityButton")
      .click()
      .get("dso-map-controls-buttons")
      .invoke("attr", "open", "")
      .get("dso-map-controls-panel")
      .invoke("attr", "open", "")
      .get("@dsoMapControlsPanelShadow")
      .find("dialog header h2")
      .should("have.text", "Kaartlagen")
      .closest("header")
      .find("button span")
      .should("have.text", "Verberg paneel Kaartlagen");

    cy.percySnapshot();
  });

  it("should emit zoom events", () => {
    cy.get("@dsoMapControlsButtonsShadow")
      .find(".dso-zoom-buttons")
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

  it.skip("should emit toggle events", () => {
    cy.get("@toggleVisibilityButton")
      .click()
      .get("@dsoToggle")
      .should("have.been.calledOnce")
      .and("have.been.calledWith", Cypress.sinon.match.object)
      .its("firstCall.args.0.detail")
      .should("deep.include", { open: true })
      .get("dso-map-controls-buttons")
      .invoke("attr", "open", "")
      .get("dso-map-controls-panel")
      .invoke("attr", "open", "")
      .get("@toggleVisibilityButton")
      .click()
      .get("@dsoToggle")
      .should("have.been.calledTwice")
      // .and("have.been.calledWith", Cypress.sinon.match.object)
      // .its("firstCall.args.0.detail")
      // .should("deep.include", { open: false })
      .get("dso-map-controls-buttons")
      .invoke("removeAttr", "open")
      .get("dso-map-controls-panel")
      .invoke("removeAttr", "open")
      .get("@toggleVisibilityButton")
      .click()
      .get("@dsoToggle")
      .should("have.been.calledThrice")
      // .and("have.been.calledWith", Cypress.sinon.match.object)
      // .its("firstCall.args.0.detail")
      // .should("deep.include", { open: true })
      .get("dso-map-controls-buttons")
      .invoke("attr", "open", "")
      .get("dso-map-controls-panel")
      .invoke("attr", "open", "")
      .get("@dsoMapControlsPanelShadow")
      .find("dialog")
      .should("not.have.css", "display", "none")
      .and("exist")
      .find(".dso-close-button")
      .click()
      .get("dso-map-controls-buttons")
      .invoke("removeAttr", "open")
      .get("dso-map-controls-panel")
      .invoke("removeAttr", "open")
      .get("@dsoClose")
      .should("have.been.calledOnce");
  });

  it("should emit dsoBaseLayerChange event", () => {
    cy.get("@toggleVisibilityButton")
      .click()
      .get("dso-map-controls-buttons")
      .invoke("attr", "open", "")
      .get("dso-map-controls-panel")
      .invoke("attr", "open", "")
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
      .get("dso-map-controls-buttons")
      .invoke("attr", "open", "")
      .get("dso-map-controls-panel")
      .invoke("attr", "open", "")
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
