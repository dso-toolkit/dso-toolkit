import { HandlerFunction } from '@storybook/addon-actions';
import { v1 as uuidv4 } from 'uuid';

import { Parameters, TemplateFn } from '@core';

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

export interface DatePickerTemplateFn<TemplateFnReturnType> extends TemplateFn<DatePickerArgs, TemplateFnReturnType> {
}

export interface DatePickerParameters<TemplateFnReturnType> extends Parameters<DatePickerArgs, TemplateFnReturnType> {
}

export function storiesOfDatePicker<TemplateFnReturnType>({
  module: mainModule,
  storiesOf,
  readme,
  template
}: DatePickerParameters<TemplateFnReturnType>) {
  const stories = storiesOf('Date Picker', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      args: {
        label: 'Datum',
        disabled: false,
        showExternalButton: false
      },
      argTypes: {
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
      }
    });

  stories.add(
    'default',
    template as any,
    {
      args: {
        id: uuidv4()
      }
    }
  );

  stories.add(
    'disabled',
    template as any,
    {
      args: {
        id: uuidv4(),
        disabled: true
      }
    }
  );

  stories.add(
    'with value',
    template as any,
    {
      args: {
        id: uuidv4(),
        value: '15-11-2020'
      }
    }
  );

  stories.add(
    'with min and max',
    template as any,
    {
      args: {
        id: uuidv4(),
        min: '3-1-2020',
        max: '28-1-2020'
      }
    }
  );
}
