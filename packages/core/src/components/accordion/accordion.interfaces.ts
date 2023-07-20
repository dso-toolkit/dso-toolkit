export type AccordionVariant = "default" | "compact" | "conclusion" | "neutral";

export interface AccordionInternalState {
  variant?: AccordionVariant;
  reverseAlign?: boolean;
}
