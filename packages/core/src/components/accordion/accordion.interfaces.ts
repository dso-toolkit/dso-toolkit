export type AccordionVariant = "default" | "compact" | "conclusion" | "neutral";

export interface AccordionInternalState {
  variant?: AccordionVariant;
  reverseAlign?: boolean;
  allowMultipleOpen: boolean;
}

export interface AccordionSectionToggleEvent {
  /** When the section is toggled by clicking in the header the `MouseEvent` is available. */
  originalEvent?: MouseEvent;
  section: {
    element: HTMLElement;
    open: boolean;
  };
  sections: HTMLElement[];
}

export interface AccordionSectionToggleAnimationEndEvent {
  section: {
    element: HTMLElement;
    open: boolean;
  };
}
