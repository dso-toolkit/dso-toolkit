import { HandlerFunction } from '@storybook/addon-actions';
import { ArgTypes, noControl } from '../../../../stories-helpers';

import { FormGroupInputNumber } from '../../form.models';

export interface FormGroupInputNumberArgs {
  id: string,
  label: string,
  state?: 'invalid' | 'valid',
  count: number,
  required: boolean,
  disabled: boolean,
  readonly: boolean,
  min: number,
  max: number,
  minusButtonInactive: boolean,
  plusButtonInactive: boolean
}

export const formGroupInputNumberArgTypes: ArgTypes<FormGroupInputNumberArgs> = {
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
  count: {
    control: {
      type: 'number'
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
  readonly: {
    control: {
      type: 'boolean'
    }
  },
  min: {
    control: {
      type: 'number'
    }
  },
  max: {
    control: {
      type: 'number'
    }
  },
  minusButtonInactive: {
    control: {
      type: 'boolean'
    }
  },
  plusButtonInactive: {
    control: {
      type: 'boolean'
    }
  }
};

export function formGroupInputNumberArgsMapper(a: FormGroupInputNumberArgs): FormGroupInputNumber<any> {
  return {
    group: 'input-number',
    id: a.id,
    label: a.label,
    count: a.count,
    required: a.required,
    disabled: a.disabled,
    readonly: a.readonly,
    state: a.state,
    min: a.min,
    max: a.max,
    minusButtonInactive: a.minusButtonInactive,
    plusButtonInactive: a.plusButtonInactive
  };
}
