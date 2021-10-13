import { HandlerFunction } from '@storybook/addon-actions';

import { Label } from './label.models';

import { ArgTypes } from '../../stories-helpers';

export interface LabelArgs {
  status?: string;
  compact?: boolean;
  label: string;
  button?: {
    title: string;
    icon: string;
    onClick: HandlerFunction;
  };
}

export const labelArgTypes: ArgTypes<LabelArgs> = {
  status: {
    options: [undefined, 'primary', 'success', 'info', 'warning', 'danger', 'bright'],
    control: {
      type: 'select',
    }
  },
  button: {
    control: {
      disable: true
    }
  },
  compact: {
    control: {
      type: 'boolean'
    }
  },
  label: {
    control: {
      type: 'text'
    }
  }
};

export function labelArgsMapper(a: LabelArgs): Label {
  return {
    label: a.label,
    button: a.button,
    compact: a.compact,
    status: a.status
  };
}
