import { HandlerFunction } from '@storybook/addon-actions';

import { ArgTypes, noControl } from '../../storybook';
import { AccordionHeading, AccordionSectionState } from './accordion.models';

export interface AccordionArgs {
  variant: 'compact' | 'conclusion';
  reverseAlign: boolean;
  allowMultiple: boolean;
  dsoToggleSection: HandlerFunction;
  ___: undefined;
  open: boolean;
  status: string;
  state: AccordionSectionState;
  attachmentCount: number;
  icon: string;
  heading: AccordionHeading;
  handleHref: string;
}

export const accordionArgTypes: ArgTypes<AccordionArgs> = {
  variant: {
    options: [undefined, 'compact', 'conclusion'],
    control: {
      type: 'select',
      labels: {
        undefined: 'default',
      }
    },
  },
  allowMultiple: {
    control: {
      type: 'boolean',
    },
  },
  reverseAlign: {
    control: {
      type: 'boolean',
    },
  },
  dsoToggleSection: {
    ...noControl,
    action: 'dsoToggleSection',
  },
  /* Section args */
  ___: {
    description: 'Hieronder staan controls voor de eerste getoonde sectie',
    control: {
      disable: true
    },
  },
  open: {
    control: {
      type: 'boolean',
    },
  },
  status: {
    control: {
      type: 'text',
    },
  },
  state: {
    options: [undefined, 'success', 'info', 'warning', 'danger'],
    control: {
      type: 'select'
    },
  },
  attachmentCount: {
    control: {
      type: 'number',
    }
  },
  icon: {
    control: {
      type: 'select',
      options: [undefined, '', 'plus', 'table']
    }
  },
  heading: {
    options: ['h2', 'h3', 'h4', 'h5'],
    control: {
      type: 'select',
    }
  },
  handleHref: {
    control: {
      text: 'select',
    }
  },
};
