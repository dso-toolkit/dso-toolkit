export interface ExpandableAnimationStartEvent {
  currentOpen: boolean;
  nextOpen: boolean;
}

export interface ExpandableAnimationEndEvent {
  bodyHeight: number | undefined;
  open: boolean;
}
