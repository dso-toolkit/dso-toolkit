export const transitionDuration = 300; // Sync with $transition-duration in ./map-controls.scss

export interface MapControlsToggleEvent {
  originalEvent?: MouseEvent | KeyboardEvent;
  open: boolean;
}
