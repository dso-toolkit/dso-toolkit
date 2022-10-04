import { HandlerFunction } from '@storybook/addon-actions';

import { ArgTypes, noControl } from '../../storybook';
import { Accordion, AccordionHeading, AccordionSection, AccordionSectionState } from './accordion.models';

export interface AccordionArgs {
  variant: 'compact' | 'conclusion';
  reverseAlign: boolean;
  allowMultiple: boolean;
  dsoToggleSection: HandlerFunction;
  open: boolean;
  status: string;
  state: AccordionSectionState;
  attachmentCount: number;
  icon: string;
  heading: AccordionHeading;
  handleUrl: string;
  handleTitle: string;

  content: string;
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
    options: [undefined, '', 'plus', 'table'],
    control: {
      type: 'select',
    }
  },
  heading: {
    options: ['h2', 'h3', 'h4', 'h5'],
    control: {
      type: 'select',
    }
  },
  handleUrl: {
    control: {
      text: 'select',
    }
  },
  handleTitle: {
    control: {
      type: 'text',
    },
  },
  content: {
    ...noControl,
  }
};

export function accordionArgsMapper(a: AccordionArgs): Accordion & AccordionSection & { content: string; } {
  return {
    variant: a.variant,
    reverseAlign: a.reverseAlign,
    allowMultiple: a.allowMultiple,
    dsoToggleSection: a.dsoToggleSection,
    open: a.open,
    status: a.status,
    state: a.state,
    attachmentCount: a.attachmentCount,
    icon: a.icon,
    heading: a.heading,
    handleUrl: a.handleUrl,
    handleTitle: a.handleTitle,

    content: a.content,
  };
}
