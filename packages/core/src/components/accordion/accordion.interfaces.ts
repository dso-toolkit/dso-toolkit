export type AccordionVariant = 'default' | 'compact' | 'conclusion';

export type AccordionSectionState = 'success' | 'info' | 'warning' | 'danger';

export type AccordionHeading = 'h2' | 'h3' | 'h4' | 'h5';

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
