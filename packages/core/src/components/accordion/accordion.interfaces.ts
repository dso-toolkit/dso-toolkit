export type AccordionHandleElement = 'anchor' | 'button';

export type AccordionVariant = 'default' | 'compact' | 'conclusion';

export interface AccordionState {
  variant: AccordionVariant;
  handleElement: AccordionHandleElement;

}
