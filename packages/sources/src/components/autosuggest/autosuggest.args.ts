import { HandlerFunction } from '@storybook/addon-actions';

import { ArgTypes } from '../../stories-helpers';

export interface AutosuggestArgs {
  suggestOnFocus: boolean;
  loading: boolean;
  loadingLabel: string;
  loadingDelayed: number;
  notFoundLabel: string;
  onSelect: HandlerFunction;
  onChange: HandlerFunction;
  onSearch: HandlerFunction;
}

export const autosuggestArgTypes: ArgTypes<AutosuggestArgs> = {
  suggestOnFocus: {
    control: {
      type: 'boolean',
    },
  },
  loading: {
    control: {
      type: 'boolean',
    },
  },
  loadingLabel: {
    control: {
      type: 'text',
    },
  },
  loadingDelayed: {
    control: {
      type: 'number',
    },
  },
  notFoundLabel: {
    control: {
      type: 'text',
    },
  },
  onSelect: {
    action: 'onSelect'
  },
  onChange: {
    action: 'onChange'
  },
  onSearch: {
    action: 'onSearch'
  }
};
