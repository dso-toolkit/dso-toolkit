import { BaseLayer, BaseLayerChangeEvent, Overlay, OverlayChangeEvent } from "../map-controls/map-controls.models";

export const mapControlsMode = ["sidebar", "floating"] as const;

export type MapControlsMode = (typeof mapControlsMode)[number];

export interface MapControlsPanel {
  identifier: string;
  open: boolean;
  baseLayers: BaseLayer[];
  overlays: Overlay[];
  mode?: MapControlsMode;
  panelTitle?: string;
  dsoClose?: (e: CustomEvent<MapControlsCloseEvent>) => void;
  dsoBaseLayerChange?: (e: CustomEvent<BaseLayerChangeEvent>) => void;
  dsoToggleOverlay?: (e: CustomEvent<OverlayChangeEvent>) => void;
}

export interface MapControlsCloseEvent {
  originalEvent?: MouseEvent | KeyboardEvent;
  open: boolean;
}
