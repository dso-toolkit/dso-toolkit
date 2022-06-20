export type MainSize = "small" | "medium" | "large";

export interface ViewerGridChangeSizeEvent {
  /**
   * Indicates whether it's before or after the animation
   */
  stage: 'start' | 'end';
  previousSize: MainSize;
  currentSize: MainSize;
}

export interface FilterpanelEvent {
  originalEvent: MouseEvent;
}
