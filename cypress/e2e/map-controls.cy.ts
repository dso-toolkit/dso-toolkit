import { BaseLayer } from "../../packages/core/src/components/map-base-layers/map-base-layers.interfaces";
import { Overlay } from "../../packages/core/src/components/map-overlays/map-overlays.interfaces";

describe("Map Controls", () => {
  it("should close layer info when layer becomes available", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-map-controls--map-controls");

    cy.get("dso-map-controls").shadow().find("#toggle-visibility-button").click();

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
    cy.visit("http://localhost:45000/iframe.html?id=core-map-controls--map-controls");

    cy.get("dso-map-controls")
      .shadow()
      .as("dsoMapControlsShadow")
      .find("#toggle-visibility-button")
      .click()
      .get("@dsoMapControlsShadow")
      .find("section header h2")
      .should("have.text", "Kaartlagen")
      .closest("header")
      .find("button span")
      .should("have.text", "Verberg paneel Kaartlagen");

    cy.percySnapshot();
  });
});
