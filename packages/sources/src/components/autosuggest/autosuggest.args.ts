import { HandlerFunction } from '@storybook/addon-actions';

import { ArgTypes } from '../../storybook';

export interface AutosuggestArgs {
  suggestOnFocus: boolean;
  loading: boolean;
  loadingLabel: string;
  loadingDelayed: number;
  notFoundLabel: string;
  onDsoSelect: HandlerFunction;
  onDsoChange: HandlerFunction;
  onDsoSearch: HandlerFunction;
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
  onDsoSelect: {
    action: 'onDsoSelect'
  },
  onDsoChange: {
    action: 'onDsoChange'
  },
  onDsoSearch: {
    action: 'onDsoSearch'
  }
};
