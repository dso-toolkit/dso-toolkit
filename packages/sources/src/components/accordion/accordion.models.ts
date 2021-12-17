export interface Accordion {
  variant?: string;
  sections: AccordionSection[];
  reverseAlign?: boolean;
}

export interface AccordionSection {
  state?: string;
  open?: boolean;
  subsections?: AccordionSection[];
  type: string;
  title: string;
  status?: string;
  attachments?: number;
  header: string;
  id: string;
  richContent?: string;
  variant?: string;
  icon?: string;
}
