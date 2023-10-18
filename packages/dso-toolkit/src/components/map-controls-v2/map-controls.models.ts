import { MapControlsButtons } from "../map-controls-buttons/map-controls-buttons.models.js";
import { MapControlsPanel } from "../map-controls-panel/map-controls-panel.models.js";

export interface MapControlsV2 {
  mapControlsButtons?: MapControlsButtons;
  mapControlsPanel?: MapControlsPanel;
}

export interface MapControlsToggleEvent {
  originalEvent?: MouseEvent | KeyboardEvent;
  open: boolean;
}
