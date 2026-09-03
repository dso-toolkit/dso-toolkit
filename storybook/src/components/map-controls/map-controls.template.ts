import { html } from "lit-html";

import { richContentTemplate } from "../rich-content/rich-content.template.js";

import { BaseLayerChangeEvent, MapControls, OverlayChangeEvent } from "./map-controls.models.js";

export function mapControlsTemplate({
  dsoZoomIn,
  dsoZoomOut,
  dsoToggle,
  open,
  baseLayers,
  dsoBaseLayerChange,
  overlays,
  dsoToggleOverlay,
  disableZoom,
}: MapControls) {
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
    </dso-map-controls>
  `;
}
