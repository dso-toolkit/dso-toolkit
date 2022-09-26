import { MapControls } from '@dso-toolkit/sources';
import { html } from 'lit-html';

import { BaseLayerChangeEvent } from '../map-base-layers/map-base-layers.interfaces';
import { OverlayChangeEvent } from '../map-overlays/map-overlays.interfaces';

export function mapControlsTemplate({
  dsoZoomIn,
  dsoZoomOut,
  open,
  baseLayers,
  dsoBaseLayerChange,
  overlays,
  dsoToggleOverlay,
  disableZoom
}: MapControls) {
  return html`
    <dso-map-controls
      @dsoZoomIn=${dsoZoomIn}
      @dsoZoomOut=${dsoZoomOut}
      .disableZoom=${disableZoom}
      ?open=${open}
    >
      <dso-map-base-layers
        .baseLayers=${baseLayers}
        @dsoBaseLayerChange=${(e: CustomEvent<BaseLayerChangeEvent>) => dsoBaseLayerChange(e)}
      ></dso-map-base-layers>
      <dso-map-overlays
        .overlays=${overlays}
        @dsoToggleOverlay=${(e: CustomEvent<OverlayChangeEvent>) => dsoToggleOverlay(e)}
      ></dso-map-overlays>
      <div class="dso-rich-content">
        <p>Dit is een Web Component wat aangesloten kan worden op Leaflet.js of OpenLayers.</p>
      </div>
    </dso-map-controls>
  `;
}
