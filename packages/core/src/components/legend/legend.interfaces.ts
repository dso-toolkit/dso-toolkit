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

export interface LegendGroupModeChangeEvent {
  originalEvent: MouseEvent;
  next: LegendMode;
}

export interface LegendItemDeleteEvent {
  originalEvent: MouseEvent;
}

export interface LegendItemActiveChangeEvent {
  /**
   * De huidige status van de Legend Item.
   */
  current: boolean;

  /**
   * De gewenste status van de Legend Item.
   */
  next: boolean;

  originalEvent: Event;
}
