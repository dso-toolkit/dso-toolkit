export type AccordionHandleElement = "anchor" | "button";

export type AccordionVariant = "default" | "compact" | "conclusion";

export type AccordionSectionState = "success" | "info" | "warning" | "danger";

export type AccordionHeading = "h2" | "h3" | "h4" | "h5";

export interface Accordion<TemplateFnReturnType> {
  variant?: AccordionVariant;
  reverseAlign?: boolean;
  allowMultipleOpen?: boolean;
  dsoToggleSection?: (e: CustomEvent<AccordionSectionToggleEvent>) => void;
  sections: AccordionSection<TemplateFnReturnType>[];
}

export interface AccordionSection<TemplateFnReturnType> {
  open?: boolean;
  handleTitle: string;
  heading: AccordionHeading;
  handleUrl?: string;
  status?: string;
  state?: AccordionSectionState;
  icon?: string;
  attachmentCount?: number;
  content?: TemplateFnReturnType;
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
