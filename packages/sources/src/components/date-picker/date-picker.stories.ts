import { v1 as uuidv4 } from 'uuid';

import { bindTemplate, StorybookParameters } from '../../stories-helpers';

import { datePickerArgsMapper, datePickerArgTypes } from './date-picker.args';
import { DatePicker } from './date-picker.models';

export interface DatePickerParameters<TemplateFnReturnType> {
  datePickerTemplate: (datePickerProperties: DatePicker) => TemplateFnReturnType;
}

export function storiesOfDatePicker<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    datePickerTemplate
  }: DatePickerParameters<TemplateFnReturnType>
) {
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
      argTypes: datePickerArgTypes
    });

  stories.add(
    'default',
    bindTemplate(datePickerArgsMapper, datePickerTemplate),
    {
      args: {
        id: uuidv4()
      }
    }
  );

  stories.add(
    'disabled',
    bindTemplate(datePickerArgsMapper, datePickerTemplate),
    {
      args: {
        id: uuidv4(),
        disabled: true
      }
    }
  );

  stories.add(
    'with value',
    bindTemplate(datePickerArgsMapper, datePickerTemplate),
    {
      args: {
        id: uuidv4(),
        value: '15-11-2020'
      }
    }
  );

  stories.add(
    'with min and max',
    bindTemplate(datePickerArgsMapper, datePickerTemplate),
    {
      args: {
        id: uuidv4(),
        min: '3-1-2020',
        max: '28-1-2020'
      }
    }
  );
}
