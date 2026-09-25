export interface BaseLayer {
  id: number;
  name: string;
  checked?: boolean;
  disabled?: boolean;
  info?: string;
}

export interface BaseLayerChangeEvent {
  activeBaseLayer: BaseLayer;
}

export interface Overlay {
  id: number;
  name: string;
  checked?: boolean;
  disabled?: boolean;
  info?: string;
}

export interface OverlayChangeEvent {
  overlay: Overlay;
  checked: boolean;
}

export interface MapControls {
  dsoZoomIn?: (e: CustomEvent<MouseEvent>) => void;
  dsoZoomOut?: (e: CustomEvent<MouseEvent>) => void;
  dsoToggle?: (e: CustomEvent<MapControlsToggleEvent>) => void;
  open: boolean;
  baseLayers: BaseLayer[];
  dsoBaseLayerChange?: (e: CustomEvent<BaseLayerChangeEvent>) => void;
  overlays: Overlay[];
  dsoToggleOverlay?: (e: CustomEvent<OverlayChangeEvent>) => void;
  disableZoom?: "both" | "in" | "out" | undefined;
}

export interface MapControlsToggleEvent {
  originalEvent?: MouseEvent | KeyboardEvent;
  open: boolean;
}
