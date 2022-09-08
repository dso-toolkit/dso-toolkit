import { HandlerFunction } from '@storybook/addon-actions';

import { Label } from './label.models';

import { ArgTypes } from '../../storybook';

export interface LabelArgs {
  status?: string;
  compact?: boolean;
  truncate?: boolean;
  label: string;
  removable?: boolean;
  onRemoveClick?: HandlerFunction;
  symbol: string;
}

export const labelArgTypes: ArgTypes<LabelArgs> = {
  status: {
    options: [undefined, 'primary', 'success', 'info', 'warning', 'danger', 'bright'],
    control: {
      type: 'select',
    }
  },
  removable: {
    control: {
      type: 'boolean'
    }
  },
  onRemoveClick: {
    action: 'onRemoveClick'
  },
  compact: {
    control: {
      type: 'boolean'
    }
  },
  truncate: {
    control: {
      type: 'boolean'
    }
  },
  label: {
    control: {
      type: 'text'
    }
  },
  symbol: {
    control: {
      type: 'text'
    }
  }
};

export function labelArgsMapper(a: LabelArgs): Label {
  return {
    label: a.label,
    removable: a.removable,
    onRemoveClick: a.onRemoveClick,
    compact: a.compact,
    truncate: a.truncate,
    status: a.status,
    symbol: a.symbol
  };
}
