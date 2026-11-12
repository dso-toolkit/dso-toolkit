export type AccordionVariant = "default" | "compact" | "conclusion" | "neutral" | "compact-black";

export interface AccordionInternalState {
  variant: AccordionVariant;
  reverseAlign: boolean;
}
