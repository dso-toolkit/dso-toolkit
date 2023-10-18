import { MapControlsButtons } from "dso-toolkit";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreMapControlsButtons: ComponentImplementation<MapControlsButtons> = {
  component: "mapControlsButtons",
  implementation: "core",
  template: () =>
    function mapControlsButtonsTemplate({
      identifier,
      dsoZoomIn,
      dsoZoomOut,
      dsoToggle,
      open,
      disableZoom,
      enableMapLayers,
      buttonLabel,
      buttonLabelMode,
    }) {
      return html`
        <dso-map-controls-buttons
          identifier=${identifier}
          @dsoZoomIn=${dsoZoomIn}
          @dsoZoomOut=${dsoZoomOut}
          @dsoToggle=${dsoToggle}
          .disableZoom=${disableZoom}
          enable-map-layers=${ifDefined(enableMapLayers)}
          button-label=${ifDefined(buttonLabel)}
          button-label-mode=${ifDefined(buttonLabelMode)}
          ?open=${open}
        >
          <button type="button">
            <dso-icon icon="location-search"></dso-icon>
          </button>
          <button type="button">
            <dso-icon icon="measurement"></dso-icon>
          </button>
          <button type="button">
            <dso-icon icon="land"></dso-icon>
          </button>
        </dso-map-controls-buttons>
      `;
    },
};
