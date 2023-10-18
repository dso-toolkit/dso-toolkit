export interface MapControlsToggleEvent {
  originalEvent?: MouseEvent | KeyboardEvent;
  open: boolean;
}

export type DisableZoom = "in" | "out" | "both";

export type ButtonLabelMode = "hidden" | "responsive";
