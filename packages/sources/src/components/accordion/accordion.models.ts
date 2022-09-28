import { AttachmentsCounter, Icon } from '../..';

export type AccordionHandleElement = 'anchor' | 'button';

export type AccordionVariant = 'default' | 'compact' | 'conclusion';

export type AccordionSectionState = 'success' | 'info' | 'warning' | 'danger';

export type AccordionHeading = 'h2' | 'h3' | 'h4' | 'h5';

export interface Accordion {
  variant?: AccordionVariant;
  reverseAlign?: boolean;
  multiSelectable?: boolean;
}

export interface AccordionSection {
  state?: AccordionSectionState;
  open?: boolean;
  title: string;
  status?: string;
  attachmentsCounter?: AttachmentsCounter;
  heading: AccordionHeading;
  handleHref?: string;
  // variant?: 'compact' | 'conclusion';
  icon?: Icon;
}

export type AccordionDemoSection = AccordionSection & { children?: string; };
