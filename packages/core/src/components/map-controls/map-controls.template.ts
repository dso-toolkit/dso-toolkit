import { checkFix, MapControls } from '@dso-toolkit/sources';
import { html } from 'lit-html';

import { SelectedBaseLayerChangeEvent } from '../map-base-layers/map-base-layers.interfaces';
import { CheckedOverlaysChangeEvent, Overlay } from '../map-overlays/map-overlays.interfaces';

export function mapControlsTemplate({
  zoomIn,
  zoomOut,
  open,
  baseLayers,
  selectedBaseLayer,
  baseLayerChange,
  overlays,
  checkedOverlays,
  checkedOverlaysChange,
  disableZoom
}: MapControls) {
  return html`
    <dso-map-controls
      @zoomIn=${zoomIn}
      @zoomOut=${zoomOut}
      .disableZoom=${disableZoom}
      ?open=${open}
    >
      <form>
        <div class="rich-content">
          <p>Inhoud</p>
        </div>
        <dso-map-base-layers
          .baseLayers=${baseLayers}
          .selectedBaseLayer=${selectedBaseLayer}
          @baseLayerChange=${(e: SelectedBaseLayerChangeEvent) => baseLayerChange(e.detail)}
        ></dso-map-base-layers>
        <dso-map-overlays
          .overlays=${overlays}
          .checkedOverlays=${checkFix<Overlay>(checkedOverlays, overlays, o => o.name)}
          @checkedOverlaysChange=${(e: CheckedOverlaysChangeEvent) => checkedOverlaysChange(e.detail)}
        ></dso-map-overlays>
        <div class="rich-content">
          <p>Ook nog meer inhoud</p>
        </div>
      </form>
    </dso-map-controls>
  `;
}
