import { baseLayers, overlays } from './map-controls.content';

export interface MapControls {
  zoomIn: (e: CustomEvent<MouseEvent>) => void;
  zoomOut: (e: CustomEvent<MouseEvent>) => void;
  open: boolean;
  baseLayers: typeof baseLayers;
  baseLayerChange: (e: CustomEvent<any>) => void;
  overlays: typeof overlays;
  toggleOverlay: (e: CustomEvent<any>) => void;
  disableZoom?: 'both' | 'in' | 'out' | undefined;
}
