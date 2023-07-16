export type AccordionVariant = "default" | "compact" | "conclusion" | "neutral";

export interface AccordionInternalState {
  variant?: AccordionVariant;
  reverseAlign?: boolean;
}

export interface AccordionSectionToggleClickEvent {
  /**
   * The original MouseEvent that triggered the click.
   *
   * In case the Section Handle is an <a> this event can be used to preventDefault() so the framework router is reponsible for navigating the user.
   */
  originalEvent?: MouseEvent;

  /**
   * The requested state. If the Accordion Section is closed, `open = true`.
   */
  open: boolean;
}

export interface AccordionSectionAnimationEndEvent {
  /**
   * Helper function to scroll the Accordion Section into view.
   */
  scrollIntoView(): void;

  /**
   * The state of the Accordion Section after animation.
   */
  open: boolean;
}
