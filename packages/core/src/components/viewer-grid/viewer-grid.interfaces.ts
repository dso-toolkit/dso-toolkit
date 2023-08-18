export interface ViewerGridChangeSizeEvent {
  /**
   * Indicates whether it's before or after the animation
   */
  stage: "start" | "end";
  previousSize: MainSize;
  currentSize: MainSize;
}

export interface ViewerGridCloseOverlayEvent {
  originalEvent: MouseEvent | Event;
}

export interface ViewerGridFilterpanelCancelEvent {
  originalEvent: MouseEvent | Event;
}

export interface ViewerGridFilterpanelApplyEvent {
  originalEvent: MouseEvent | Event;
}

export type MainSize = "small" | "medium" | "large";

export type LabelSizeMap = { [key in MainSize]: string };

export const tabs = ["main", "map"] as const;

export type Tabs = (typeof tabs)[number];

export type TabLabelMap = { [key in Tabs]: string };
