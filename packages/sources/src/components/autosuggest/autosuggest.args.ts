import { HandlerFunction } from '@storybook/addon-actions';

import { ArgTypes } from '../../storybook';

export interface AutosuggestArgs {
  suggestOnFocus: boolean;
  loading: boolean;
  loadingLabel: string;
  loadingDelayed: number;
  notFoundLabel: string;
  dsoSelect: HandlerFunction;
  dsoChange: HandlerFunction;
  dsoSearch: HandlerFunction;
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
  dsoSelect: {
    action: 'onDsoSelect'
  },
  dsoChange: {
    action: 'onDsoChange'
  },
  dsoSearch: {
    action: 'onDsoSearch'
  }
};
