export interface DsoCardClickedEvent {
  originalEvent?: MouseEvent;
  /** True when user clicked the card while holding Ctrl, Alt or other modifiers, or when the card is right-clicked. Can be used to determine navigation. */
  isModifiedEvent: boolean;
}

export type ImageShape = "normal" | "wide";
