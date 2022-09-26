import { baseLayers, overlays } from './map-controls.content';

export interface MapControls {
  dsoZoomIn: (e: CustomEvent<MouseEvent>) => void;
  dsoZoomOut: (e: CustomEvent<MouseEvent>) => void;
  open: boolean;
  baseLayers: typeof baseLayers;
  dsoBaseLayerChange: (e: CustomEvent<any>) => void;
  overlays: typeof overlays;
  dsoToggleOverlay: (e: CustomEvent<any>) => void;
  disableZoom?: 'both' | 'in' | 'out' | undefined;
}
