import { baseLayers, overlays, selectedBaseLayer } from './map-controls.content';

export interface MapControls {
  zoomIn: (e: unknown) => void;
  zoomOut: (e: unknown) => void;
  open: boolean;
  baseLayers: typeof baseLayers;
  selectedBaseLayer: typeof selectedBaseLayer;
  baseLayerChange: (e: unknown) => void;
  overlays: typeof overlays;
  checkedOverlays: typeof overlays[0] | string[] | undefined;
  checkedOverlaysChange: (e: unknown) => void;
  disableZoom?: 'both' | 'in' | 'out' | undefined;
}
