import { MapControls } from "dso-toolkit";
import { html } from "lit-html";

import { BaseLayerChangeEvent } from "@dso-toolkit/core/src/components/map-base-layers/map-base-layers.interfaces";
import { OverlayChangeEvent } from "@dso-toolkit/core/src/components/map-overlays/map-overlays.interfaces";

import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreMapControls: ComponentImplementation<MapControls> = {
  component: "mapControls",
  implementation: "core",
  template: ({ richContentTemplate }) =>
    function mapControlsTemplate({
      open,
      baseLayers,
      overlays,
      disableZoom,
      enableMapLayers,
      buttonLabel,
      panelTitle,
      buttonLabelMode,
      dsoBaseLayerChange,
      dsoToggleOverlay,
      dsoZoomIn,
      dsoZoomOut,
      dsoToggle,
    }) {
      return html`
        <dso-map-controls
          .disableZoom=${disableZoom}
          enable-map-layers=${ifDefined(enableMapLayers)}
          button-label=${ifDefined(buttonLabel)}
          panel-title=${ifDefined(panelTitle)}
          button-label-mode=${ifDefined(buttonLabelMode)}
          ?open=${open}
          @dsoZoomIn=${dsoZoomIn}
          @dsoZoomOut=${dsoZoomOut}
          @dsoToggle=${dsoToggle}
        >
          <dso-map-base-layers
            .baseLayers=${baseLayers}
            @dsoBaseLayerChange=${(e: CustomEvent<BaseLayerChangeEvent>) => dsoBaseLayerChange?.(e)}
          ></dso-map-base-layers>
          <dso-map-overlays
            .overlays=${overlays}
            @dsoToggleOverlay=${(e: CustomEvent<OverlayChangeEvent>) => dsoToggleOverlay?.(e)}
          ></dso-map-overlays>
          ${richContentTemplate({
            children: html` <p>Dit is een Web Component wat aangesloten kan worden op Leaflet.js of OpenLayers.</p>`,
          })}
          <button type="button" slot="custom-buttons">
            <dso-icon icon="location-search"></dso-icon>
          </button>
          <button type="button" slot="custom-buttons">
            <dso-icon icon="measurement"></dso-icon>
          </button>
          <button type="button" slot="custom-buttons">
            <dso-icon icon="land"></dso-icon>
          </button>
        </dso-map-controls>
      `;
    },
};
