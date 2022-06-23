import { HandlerFunction } from '@storybook/addon-actions';
import { ArgTypes, noControl } from '../../../../stories-helpers';
import { v4 as uuidv4 } from 'uuid';

import { FormGroupConfirm } from '../../form.models';

import { Selectable } from '../../../selectable/selectable.models';

export interface FormGroupConfirmArgs {
  id: string;
  state?: 'invalid' | 'valid';
  required: boolean;
  disabled: boolean;
  errorText?: string;
  helpText?: string;
}

export const formGroupConfirmArgTypes: ArgTypes<FormGroupConfirmArgs> = {
  id: {
    control: {
      type: 'text'
    }
  },
  state: {
    options: [undefined, 'invalid', 'valid'],
    control: {
      type: 'select'
    }
  },
  required: {
    control: {
      type: 'boolean'
    }
  },
  disabled: {
    control: {
      type: 'boolean'
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
  }
};

export function formGroupConfirmArgsMapper(a: FormGroupConfirmArgs): FormGroupConfirm<any> {
  return {
    group: 'confirm',
    id: a.id,
    required: a.required,
    disabled: a.disabled,
    state: a.state,
    errorText: a.errorText,
    helpText: a.helpText,
    selectables: [
      {
        id: uuidv4(),
        value: 'akkoord',
        type: 'checkbox',
        label: 'Ik ga akkoord met de voorwaarden'
      }
    ]
  };
}
