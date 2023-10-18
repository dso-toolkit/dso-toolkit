import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { MapControlsPanel } from "dso-toolkit";
import { BaseLayerChangeEvent } from "@dso-toolkit/core/src/components/map-base-layers/map-base-layers.interfaces";
import { OverlayChangeEvent } from "@dso-toolkit/core/src/components/map-overlays/map-overlays.interfaces";

import { ComponentImplementation } from "../../templates";

export const coreMapControlsPanel: ComponentImplementation<MapControlsPanel> = {
  component: "mapControlsPanel",
  implementation: "core",
  template: ({ richContentTemplate }) =>
    function mapControlsPanelTemplate({
      identifier,
      open,
      baseLayers,
      dsoBaseLayerChange,
      overlays,
      dsoToggleOverlay,
      mode,
      panelTitle,
      dsoClose,
    }) {
      return html`
        <dso-map-controls-panel
          id=${identifier}
          mode=${ifDefined(mode)}
          panel-title=${ifDefined(panelTitle)}
          ?open=${open}
          @dsoClose=${dsoClose}
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
            children: html`<p>Dit is een Web Component wat aangesloten kan worden op Leaflet.js of OpenLayers.</p>`,
          })}
        </dso-map-controls-panel>
      `;
    },
};
