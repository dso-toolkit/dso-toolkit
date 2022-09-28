import { ArgTypes } from '../../storybook';

import { Accordion } from './accordion.models';

export interface AccordionArgs {
  variant: 'compact' | 'conclusion';
  reverseAlign: boolean;
  multiSelectable: boolean;
  ___: undefined;
  open: boolean;
  state: 'success' | 'info' | 'warning' | 'danger';
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
    },
  },
  multiSelectable: {
    control: {
      type: 'boolean',
    },
  },
  reverseAlign: {
    control: {
      disable: true
    },
  },
  // Section Args
  ___: {
    description: 'Hieronder staan controls voor de eerste getoonde sectie',
    control: {
      disable: true
    },
  },
  state: {
    options: [undefined, 'success', 'info', 'warning', 'danger'],
    control: {
      type: 'select'
    },
  },
  open: {
    control: {
      type: 'boolean',
    },
  },
};

export function accordionArgsMapper(a: AccordionArgs): Required<Accordion> {
  return {
    variant: a.variant,
    reverseAlign: a.reverseAlign,
    multiSelectable: a.multiSelectable,
  };
}
