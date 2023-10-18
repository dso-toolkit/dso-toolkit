export const disableZoom = ["in", "out", "both"] as const;

export type DisableZoom = (typeof disableZoom)[number];

export const buttonLabelMode = ["hidden", "responsive"] as const;

export type ButtonLabelMode = (typeof buttonLabelMode)[number];

export interface MapControlsButtons {
  identifier: string;
  open: boolean;
  disableZoom?: DisableZoom;
  enableMapLayers?: boolean;
  buttonLabel?: string;
  buttonLabelMode?: ButtonLabelMode;
  dsoZoomIn?: (e: CustomEvent<MouseEvent>) => void;
  dsoZoomOut?: (e: CustomEvent<MouseEvent>) => void;
  dsoToggle?: (e: CustomEvent<MapControlsToggleEvent>) => void;
}

export interface MapControlsToggleEvent {
  originalEvent?: MouseEvent | KeyboardEvent;
  open: boolean;
}
