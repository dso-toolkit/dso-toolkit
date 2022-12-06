export type AccordionVariant = "default" | "compact" | "conclusion";

export interface AccordionInternalState {
  variant: AccordionVariant;
  reverseAlign: boolean;
}

export interface AccordionInterface {
  getState(): Promise<AccordionInternalState>;
  toggleSection(sectionElement: HTMLElement | number, event?: MouseEvent): Promise<void>;
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
