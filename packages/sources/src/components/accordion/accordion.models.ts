export enum AccordionVariant {
  Default = 'dso-accordion',
  Compact = 'dso-accordion-compact',
  Conclusion = 'dso-accordion-conclusion'
}

export interface Accordion {
  variant?: AccordionVariant;
  sections: AccordionSection[];
  reverseAlign?: boolean;
}

export interface AccordionSection {
  state: string;
  open?: boolean;
  sections?: AccordionSection[];
  type: string;
  title: string;
  status: string;
  attachments: number;
  header: string;
  id: string;
  richContent?: string;
  variant?: string;
}
