export interface ViewerGridChangeSizeEvent {
  /**
   * Indicates whether it's before or after the animation
   */
  stage: "start" | "end";
  previousSize: MainSize;
  currentSize: MainSize;
}

export interface FilterpanelEvent {
  originalEvent: MouseEvent;
}

export type MainSize = "small" | "medium" | "large";

export type LabelSizeMap = { [key in MainSize]: string };
