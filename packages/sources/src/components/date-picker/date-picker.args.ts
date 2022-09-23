import { ArgTypes } from '../../storybook';
import { HandlerFunction } from '@storybook/addon-actions';
import { DatePicker } from './date-picker.models';

export interface DatePickerArgs {
  id?: string;
  label: string;
  dsoDateChange: HandlerFunction;
  direction?: string;
  value?: string;
  min?: string;
  max?: string;
  disabled: boolean;
  autofocus: boolean;
}

export const datePickerArgTypes: ArgTypes<DatePickerArgs> = {
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
  disabled: {
    control: {
      type: 'boolean'
    }
  },
  direction: {
    options: [undefined, 'left', 'right'],
    control: {
      type: 'select',
      labels: {
        undefined: 'default',
        'left': 'left',
        'right': 'right'
      }
    }
  },
  value: {
    control: {
      type: 'text'
    }
  },
  min: {
    control: {
      type: 'text'
    }
  },
  max: {
    control: {
      type: 'text'
    }
  },
  autofocus: {
    control: {
      type: 'boolean'
    }
  },
  dsoDateChange: {
    action: 'onDsoDateChange'
  }
};

export function datePickerArgsMapper(a: DatePickerArgs): DatePicker {
  return {
    disabled: a.disabled,
    id: a.id,
    onDateChange: e => a.dsoDateChange(e.detail),
    direction: a.direction,
    max: a.max,
    min: a.min,
    value: a.value,
    autofocus: a.autofocus
  };
}
