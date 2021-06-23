import { baseLayers, overlays, selectedBaseLayer } from './map-controls.content';

export interface MapControls {
  zoomIn: (e: CustomEvent<MouseEvent>) => void;
  zoomOut: (e: CustomEvent<MouseEvent>) => void;
  open: boolean;
  baseLayers: typeof baseLayers;
  selectedBaseLayer: typeof selectedBaseLayer;
  baseLayerChange: (e: any) => void;
  overlays: typeof overlays;
  checkedOverlays: typeof overlays[0] | string[] | undefined;
  checkedOverlaysChange: (e: any) => void;
  disableZoom?: 'both' | 'in' | 'out' | undefined;
}
