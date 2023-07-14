export type AccordionVariant = "default" | "compact" | "conclusion" | "neutral";

export interface AccordionInternalState {
  variant: AccordionVariant;
  reverseAlign: boolean;
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

export function isAccordion(element: Element): element is HTMLDsoAccordionElement {
  return element.tagName === "DSO-ACCORDION";
}
