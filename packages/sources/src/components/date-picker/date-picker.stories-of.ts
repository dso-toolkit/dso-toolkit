import { Args, DecoratorFunction } from '@storybook/addons';
import { v4 as uuidv4 } from 'uuid';

import { bindTemplate, ArgsError, StorybookParameters, createStories } from '../../storybook';

import { DatePickerArgs, datePickerArgsMapper, datePickerArgTypes } from './date-picker.args';
import { DatePicker } from './date-picker.models';

export interface DatePickerParameters<TemplateFnReturnType> {
  datePickerTemplate: (datePickerProperties: DatePicker) => TemplateFnReturnType;
  datePickerWithLabelTemplate: (datePicker: TemplateFnReturnType, id: string, label: string) => TemplateFnReturnType;
  datePickerShowByScriptingTemplate: (datePicker: TemplateFnReturnType, id: string) => TemplateFnReturnType;
  decorator: DecoratorFunction<TemplateFnReturnType>;
}

export function storiesOfDatePicker<TemplateFnReturnType>(
  parameters: StorybookParameters,
  {
    datePickerTemplate,
    datePickerWithLabelTemplate,
    datePickerShowByScriptingTemplate,
    decorator
  }: DatePickerParameters<TemplateFnReturnType>
) {
  const stories = createStories('Date Picker', parameters, datePickerArgTypes)
    .addParameters({
      options: {
        // https://github.com/storybookjs/storybook/issues/12074#issuecomment-961294555
        enableShortcuts: false
      },
      args: {
        label: 'Datum',
        disabled: false
      }
    });

  const template = bindTemplate(datePickerArgsMapper, datePickerTemplate);

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
    (a: Args | undefined) => {
      if (!a) {
        throw new ArgsError();
      }

      const args = a as DatePickerArgs;

      return datePickerWithLabelTemplate(
        datePickerTemplate(datePickerArgsMapper(args)),
        args.id || uuidv4(),
        'Selecteer datum'
      );
    },
    {
      args: {
        id: uuidv4()
      }
    }
  );

  stories.add(
    'show by scripting',
    (a: Args) => {
      const args = a as DatePickerArgs;

      return datePickerShowByScriptingTemplate(
        datePickerTemplate(datePickerArgsMapper(args)),
        args.id || uuidv4()
      )
    },
    {
      args: {
        id: uuidv4()
      }
    }
  );

  stories.add(
    'narrow input',
    template,
    {
      decorators: [decorator]
    }
  );
}