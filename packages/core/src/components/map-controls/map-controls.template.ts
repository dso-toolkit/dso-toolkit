import { MapControls } from '@dso-toolkit/sources';
import { html } from 'lit-html';

import { BaseLayerChangeEvent } from '../map-base-layers/map-base-layers.interfaces';
import { OverlayChangeEvent } from '../map-overlays/map-overlays.interfaces';

export function mapControlsTemplate({
  zoomIn,
  zoomOut,
  open,
  baseLayers,
  baseLayerChange,
  overlays,
  toggleOverlay,
  disableZoom
}: MapControls) {
  return html`
    <dso-map-controls
      @zoomIn=${zoomIn}
      @zoomOut=${zoomOut}
      .disableZoom=${disableZoom}
      ?open=${open}
    >
        <dso-map-base-layers
          .baseLayers=${baseLayers}
          @baseLayerChange=${(e: CustomEvent<BaseLayerChangeEvent>) => baseLayerChange(e)}
        ></dso-map-base-layers>
        <dso-map-overlays
          .overlays=${overlays}
          @toggleOverlay=${(e: CustomEvent<OverlayChangeEvent>) => toggleOverlay(e)}
        ></dso-map-overlays>
        <div class="dso-rich-content">
        <p>Dit is een Web Component wat aangesloten kan worden op Leaflet.js of OpenLayers.</p>
        </div>
    </dso-map-controls>
  `;
}
