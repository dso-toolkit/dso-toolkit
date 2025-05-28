import { BaseLayerChangeEvent } from "@dso-toolkit/core/src/components/map-base-layers/map-base-layers.interfaces";
import { OverlayChangeEvent } from "@dso-toolkit/core/src/components/map-overlays/map-overlays.interfaces";
import { MapControls } from "dso-toolkit";
import { html } from "lit-html";

import { ComponentImplementation } from "../../templates";
import { defaultSymbol } from "../legend-item/legend-item.content";

export const coreMapControls: ComponentImplementation<MapControls> = {
  component: "mapControls",
  implementation: "core",
  template: ({ richContentTemplate, legendItemTemplate, selectableTemplate }) =>
    function mapControlsTemplate({
      dsoZoomIn,
      dsoZoomOut,
      dsoToggle,
      open,
      baseLayers,
      dsoBaseLayerChange,
      overlays,
      dsoToggleOverlay,
      disableZoom,
    }) {
      return html`
        <dso-map-controls
          @dsoZoomIn=${dsoZoomIn}
          @dsoZoomOut=${dsoZoomOut}
          @dsoToggle=${dsoToggle}
          .disableZoom=${disableZoom}
          ?open=${open}
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
            children: html` <p>Dit is een Web Component wat aangesloten kan worden op Leaflet.js of OpenLayers.</p> `,
          })}
          ${legendItemTemplate({
            disabled: true,
            content: selectableTemplate({ id: "1", type: "checkbox", value: "1", label: "Legenda item label" }),
            symbol: defaultSymbol,
          })}
        </dso-map-controls>
      `;
    },
};
