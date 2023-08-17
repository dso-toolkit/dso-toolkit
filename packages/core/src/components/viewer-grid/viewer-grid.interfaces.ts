export interface ViewerGridChangeSizeEvent {
  /**
   * Indicates whether it's before or after the animation
   */
  stage: "start" | "end";
  previousSize: MainSize;
  currentSize: MainSize;
}

export interface FilterpanelEvent {
  originalEvent: MouseEvent | KeyboardEvent | Event;
}

export interface OverlayEvent {
  originalEvent: MouseEvent | KeyboardEvent | Event;
}

export type MainSize = "small" | "medium" | "large";

export type LabelSizeMap = { [key in MainSize]: string };

export const tabs = ["main", "map"] as const;

export type Tabs = (typeof tabs)[number];

export type TabLabelMap = { [key in Tabs]: string };
