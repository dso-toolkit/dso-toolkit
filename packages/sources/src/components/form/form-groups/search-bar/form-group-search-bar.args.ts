import { HandlerFunction } from '@storybook/addon-actions';

import { ArgTypes, noControl } from '../../../../stories-helpers';

import { SearchBar } from '../../../search-bar/search-bar.models';

import { FormGroupSearchBar } from '../../form.models';

export interface FormGroupSearchBarArgs {
  id: string;
  label: string;
  errorText?: string;
  helpText?: string;
  infoButtonHandler: HandlerFunction;
  infoButtonLabel: string;
  infoActive: boolean;
  infoText: string;
  infoCloseHandler: HandlerFunction;
  infoFixed: boolean;
  state?: 'invalid' | 'valid';
  searchBarValue: string;
  searchBarButtonLabel: string;
}

export const formGroupSearchBarArgTypes: ArgTypes<FormGroupSearchBarArgs> = {
  id: {
    control: {
      type: 'text'
    }
  },
  label: {
    control: {
      type: 'text'
    }
  },
  errorText: {
    control: {
      type: 'text'
    }
  },
  helpText: {
    control: {
      type: 'text'
    }
  },
  infoActive: {
    control: {
      type: 'boolean'
    }
  },
  infoButtonHandler: {
    ...noControl,
    action: 'infoButton click'
  },
  infoButtonLabel: {
    control: {
      type: 'text'
    }
  },
  infoText: {
    control: {
      type: 'text'
    }
  },
  infoCloseHandler: {
    ...noControl,
    action: 'info close click'
  },
  infoFixed: {
    control: {
      type: 'boolean'
    }
  },
  state: {
    options: [undefined, 'invalid', 'valid'],
    control: {
      type: 'select'
    }
  },
  searchBarValue: {
    control: {
      type: 'text'
    }
  },
  searchBarButtonLabel: {
    control: {
      type: 'text'
    }
  }
};

export function formGroupSearchBarArgsMapper(a: FormGroupSearchBarArgs): FormGroupSearchBar<any>{
  return {
    group: 'search-bar',
    id: a.id,
    label: a.label,
    errorText: a.errorText,
    helpText: a.helpText,
    infoButton: a.infoButtonLabel && a.infoText
      ? {
        onClick: a.infoButtonHandler,
        active: a.infoActive,
        label: a.infoButtonLabel
      }
      : undefined,
    info: a.infoButtonLabel && a.infoText
      ? {
        active: a.infoActive,
        fixed: a.infoFixed,
        onClose: a.infoCloseHandler,
        richContent: a.infoText
      }
      : undefined,
    state: a.state,
    searchBar: {
      value: a.searchBarValue,
      id: a.id,
      buttonLabel: a.searchBarButtonLabel,
      hideSearchButton: true,
      icon: true,
      clearButton: true
    }
  };
}