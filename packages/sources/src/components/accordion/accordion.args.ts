import { ArgTypes } from '../../stories-helpers';

import { Accordion, AccordionSection } from './accordion.models';

export interface AccordionArgs {
  modifiers?: string;
  sections: AccordionSection[];
}

export const accordionArgTypes: ArgTypes<AccordionArgs> = {
  modifiers: {
    control: {
      type: 'string'
    }
  },
  sections: {
    control: {
      disable: true
    }
  }
};

export function accordionArgsMapper(a: AccordionArgs): Accordion {
  return {
    modifiers: a.modifiers,
    sections: a.sections,
  };
}
