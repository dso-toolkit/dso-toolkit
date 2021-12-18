import { AttachmentsCounter, Icon } from '../..';

export interface Accordion {
  variant?: string;
  sections: AccordionSection[];
  reverseAlign?: boolean;
}

export interface AccordionSection {
  state?: 'success' | 'info' | 'warning' | 'danger';
  open?: boolean;
  handleType: 'anchor' | 'button';
  title: string;
  status?: string;
  attachmentsCounter?: AttachmentsCounter;
  header: 'h2' | 'h3' | 'h4' | 'h5';
  variant?: 'compact' | 'conclusion';
  icon?: Icon;
  subsections?: AccordionSection[];
  children?: string;
}
