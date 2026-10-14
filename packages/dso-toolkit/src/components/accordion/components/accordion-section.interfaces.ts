export type AccordionSectionState = "success" | "info" | "warning" | "danger" | "error";

export type AccordionHeading = "h2" | "h3" | "h4" | "h5";

export type AccordionSectionWijzigactie = "voegtoe" | "verwijder";

export const stateMap: Record<AccordionSectionState, string> = {
  success: "succes:",
  info: "info:",
  warning: "waarschuwing:",
  danger: "fout:",
  error: "fout:",
};

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

export interface AccordionSectionAnimationStartEvent {
  /**
   * Helper function to scroll the Accordion Section into view.
   */
  scrollIntoView(behavior?: ScrollBehavior): void;

  /**
   * Whether or not the Accordion opening or closing.
   */
  animation: "opening" | "closing";
}

export interface AccordionSectionAnimationEndEvent {
  /**
   * Helper function to scroll the Accordion Section into view.
   */
  scrollIntoView(behavior?: ScrollBehavior): void;

  /**
   * The state of the Accordion Section after animation.
   */
  open: boolean;
}

export interface AccordionSectionActiveChangeEvent {
  /**
   * De current status van de Accordion Section.
   */
  current: boolean;

  /**
   * De desired status van de Accordion Section.
   */
  next: boolean;

  originalEvent: Event;
}
