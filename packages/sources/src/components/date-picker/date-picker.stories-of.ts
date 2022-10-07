import { DecoratorFunction } from '@storybook/addons';
import { v4 as uuidv4 } from 'uuid';

import { storiesOfFactory } from '../../storybook/stories-of-factory';

import { DatePickerArgs, datePickerArgsMapper, datePickerArgTypes } from './date-picker.args';
import { DatePicker } from './date-picker.models';

export interface DatePickerTemplates<TemplateFnReturnType> {
  datePickerTemplate: (datePickerProperties: DatePicker) => TemplateFnReturnType;
  datePickerWithLabelTemplate: (datePicker: TemplateFnReturnType, id: string, label: string) => TemplateFnReturnType;
  datePickerShowByScriptingTemplate: (datePicker: TemplateFnReturnType, id: string) => TemplateFnReturnType;
}

export interface DatePickerParameters {
  decorator: DecoratorFunction<any>;
}

export const storiesOfDatePicker = storiesOfFactory<DatePickerTemplates<any>, DatePickerArgs, DatePickerParameters>('Date Picker', (stories, templateMapper) => {
  stories
    .addParameters({
      argTypes: datePickerArgTypes,
      options: {
        // https://github.com/storybookjs/storybook/issues/12074#issuecomment-961294555
        enableShortcuts: false
      },
      args: {
        label: 'Datum',
        disabled: false
      }
    });

  const template = templateMapper((args, { datePickerTemplate }) => datePickerTemplate(datePickerArgsMapper(args)));

  stories.add(
    'default',
    template
  );

  stories.add(
    'disabled',
    template,
    {
      args: {
        disabled: true
      }
    }
  );

  stories.add(
    'with value',
    template,
    {
      args: {
        value: '15-11-2020'
      }
    }
  );

  stories.add(
    'with min and max',
    template,
    {
      args: {
        min: '3-1-2020',
        max: '28-1-2020'
      }
    }
  );

  stories.add(
    'with label',
    templateMapper((args, { datePickerTemplate, datePickerWithLabelTemplate }) =>
      datePickerWithLabelTemplate(
        datePickerTemplate(datePickerArgsMapper(args)),
        args.id || uuidv4(),
        'Selecteer datum'
      )
    ),
    {
      args: {
        id: uuidv4()
      }
    }
  );

  stories.add(
    'show by scripting',
    templateMapper((args, { datePickerTemplate, datePickerShowByScriptingTemplate }) =>
      datePickerShowByScriptingTemplate(
        datePickerTemplate(datePickerArgsMapper(args)),
        args.id || uuidv4()
      )
    ),
    {
      args: {
        id: uuidv4()
      }
    }
  );

  // Later over nadenken
  // stories.add(
  //   'narrow input',
  //   template,
  //   {
  //     decorators: [decorator]
  //   }
  // );
})
