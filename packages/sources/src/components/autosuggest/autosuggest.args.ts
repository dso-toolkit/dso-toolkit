import { HandlerFunction } from '@storybook/addon-actions';

import { ArgTypes } from '../../stories-helpers';

export interface AutosuggestArgs {
  suggestOnFocus: boolean;
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
