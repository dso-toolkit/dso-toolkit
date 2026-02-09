/**
 * Shared type for edit/view mode used by both Legend Group and Legend Item components
 */
export type LegendMode = "edit" | "view";

export interface LegendTabItem {
  label: string;
  id: string;
  active: boolean;
}

export interface LegendContentSwitchEvent {
  originalEvent: MouseEvent | KeyboardEvent;
  isModifiedEvent: boolean;
}

export interface LegendCloseEvent {
  originalEvent?: MouseEvent | Event;
}
