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
  open?: boolean;
  handleTitle: string;
  heading: AccordionHeading;
  handleUrl?: string;
  status?: string;
  state?: AccordionSectionState;
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

export type AccordionDemoSection = AccordionSection & { children?: string; };

export type AccordionStorybookParameters = Accordion & AccordionSection & { content: AccordionDemoSection[]; };
