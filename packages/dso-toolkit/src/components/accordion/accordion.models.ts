export type AccordionHandleElement = "anchor" | "button";

export type AccordionVariant = "default" | "compact" | "conclusion" | "neutral";

export type AccordionSectionState = "success" | "info" | "warning" | "danger" | "error";

export type AccordionHeading = "h2" | "h3" | "h4" | "h5";

export interface Accordion<TemplateFnReturnType> {
  variant?: AccordionVariant;
  reverseAlign?: boolean;
  dsoToggleSection?: (e: CustomEvent<AccordionSectionToggleEvent>) => void;
  dsoToggleSectionAnimationEnd?: (e: CustomEvent<AccordionSectionToggleAnimationEndEvent>) => void;
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
}

export interface AccordionSectionToggleAnimationEndEvent {
  section: {
    element: HTMLElement;
    open: boolean;
  };
}
