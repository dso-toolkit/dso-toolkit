export type AccordionHandleElement = 'anchor' | 'button';

export type AccordionVariant = 'default' | 'compact' | 'conclusion';

export type AccordionSectionState = 'success' | 'info' | 'warning' | 'danger';

export type AccordionHeading = 'h2' | 'h3' | 'h4' | 'h5';

export interface Accordion {
  variant?: AccordionVariant;
  reverseAlign?: boolean;
  allowMultiple?: boolean;
  dsoToggleSection: (value: CustomEvent<AccordionSectionToggleEvent>) => void;
}

export interface AccordionSection {
  state?: AccordionSectionState;
  open?: boolean;
  status?: string;
  heading: AccordionHeading;
  handleHref?: string;
  icon?: string;
  attachmentCount?: number;
}

export interface AccordionSectionToggleEvent {
  section: {
    element: HTMLElement;
    open: boolean;
  };
  sections: Array<HTMLElement>;
}

export type AccordionDemoSection = AccordionSection & { title: string; children?: string; };
