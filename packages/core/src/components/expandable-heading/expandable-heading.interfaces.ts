export type HeadingTags = "h2" | "h3" | "h4" | "h5" | "h6";

export interface ExpandableHeadingToggleEvent {
  originalEvent?: MouseEvent | KeyboardEvent;
  open: boolean;
}

export type EditAction = "delete" | "insert";
