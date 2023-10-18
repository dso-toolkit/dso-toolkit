export interface MapControlsToggleEvent {
  originalEvent?: MouseEvent | KeyboardEvent;
  open: boolean;
}

export type DisableZoom = "in" | "out" | "both";

export type ButtonLabelMode = "hidden" | "responsive";

export type MapControlsMode = "sidebar" | "floating";

export function isDsoMapControlsButtonComponent(element: Element): element is HTMLDsoMapControlsButtonsElement {
  return element.tagName === "DSO-MAP-CONTROLS-BUTTONS";
}
