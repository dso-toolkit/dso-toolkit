import { ArgTypes } from '../../storybook';

import { Accordion, AccordionSection } from './accordion.models';

export interface AccordionArgs {
  variant?: 'compact' | 'conclusion';
  handleType: 'anchor' | 'button';
  sections: AccordionSection[];
  reverseAlign?: boolean;
}

export const accordionArgTypes: ArgTypes<AccordionArgs> = {
  variant: {
    options: [undefined, 'dso-accordion-compact', 'dso-accordion-conclusion'],
    control: {
      type: 'select',
      labels: {
        undefined: 'default',
        'dso-accordion-compact': 'compact',
        'dso-accordion-conclusion': 'conclusion'
      }
    }
  },
  handleType: {
    options: ['anchor', 'button'],
    control: {
      type: 'select'
    }
  },
  sections: {
    control: {
      disable: true
    }
  },
  reverseAlign: {
    control: {
      disable: true
    }
  }
};

export function accordionArgsMapper(a: AccordionArgs): Accordion {
  return {
    variant: a.variant,
    handleType: a.handleType,
    sections: a.sections,
    reverseAlign: a.reverseAlign
  };
}
