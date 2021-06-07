import { ArgTypes } from '../../stories-helpers';
import { HandlerFunction } from '@storybook/addon-actions';
import { DatePicker } from './date-picker.models';

export interface DatePickerArgs {
  id: string;
  label: string;
  onDateChange: HandlerFunction;
  value?: string;
  min?: number;
  max?: number;
  disabled: boolean;
  showExternalButton: boolean;
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
  showExternalButton: {
    control: {
      type: 'boolean'
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
  onDateChange: {
    action: 'date changed'
  }
};

export function datePickerArgsMapper(a: DatePickerArgs): DatePicker {
  return {
    disabled: a.disabled,
    id: a.id,
    onDateChange: e => a.onDateChange(e.detail),
    max: a.max,
    min: a.max,
    value: a.value
  };
}
