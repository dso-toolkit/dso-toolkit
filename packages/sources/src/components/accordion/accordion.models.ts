export interface Accordion {
  modifiers?: string;
  sections: AccordionSection[];
}

export interface AccordionSection {
  state: string;
  open: boolean;
  sections: AccordionSection[];
  type: string;
  title: string;
  status: string;
  attachments: number;
  header: string;
}
