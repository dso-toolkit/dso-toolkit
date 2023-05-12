export type AccordionVariant = "default" | "compact" | "conclusion" | "neutral";

export interface AccordionInternalState {
  variant: AccordionVariant;
  reverseAlign: boolean;
  allowMultipleOpen: boolean;
}

export interface AccordionInterface {
  getState(): Promise<AccordionInternalState>;
  /** Toggle a section. Pass the `<dso-accordion-section>` element or the index of the section.\
   * returns `undefined` when no section is tiggled.\
   * returns `true` when the section is opened and `false` when the section is closed.
   */
  toggleSection(sectionElement: HTMLElement | number, event?: MouseEvent): Promise<undefined | boolean>;
  animationEnd(sectionElement: HTMLElement): Promise<void>;
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
