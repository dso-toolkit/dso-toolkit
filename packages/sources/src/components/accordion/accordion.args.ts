import { ArgTypes } from '../../storybook';

import { Accordion } from './accordion.models';

export interface AccordionArgs {
  variant: 'compact' | 'conclusion';
  handleElement: 'anchor' | 'button';
  reverseAlign: boolean;
  multiSelectable: boolean;
}

export const accordionArgTypes: ArgTypes<AccordionArgs> = {
  variant: {
    options: [undefined, 'compact', 'conclusion'],
    control: {
      type: 'select',
      labels: {
        undefined: 'default',
        'compact': 'compact',
        'conclusion': 'conclusion'
      }
    }
  },
  handleElement: {
    options: ['anchor', 'button'],
    control: {
      type: 'select'
    }
  },
  multiSelectable: {
    control: {
      type: 'boolean',
    },
  },
  reverseAlign: {
    control: {
      disable: true
    }
  }
};

export function accordionArgsMapper(a: AccordionArgs): Required<Accordion> {
  return {
    variant: a.variant,
    handleElement: a.handleElement,
    reverseAlign: a.reverseAlign,
    multiSelectable: a.multiSelectable,
  };
}
