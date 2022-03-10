import { Args } from '@storybook/addons';
import { ArgsStoryFn } from '@storybook/addons';
import { v4 as uuidv4 } from 'uuid';

import { bindTemplate, ArgsError, StorybookParameters } from '../../stories-helpers';

import { DatePickerArgs, datePickerArgsMapper, datePickerArgTypes } from './date-picker.args';
import { DatePicker } from './date-picker.models';

export interface DatePickerParameters<TemplateFnReturnType> {
  datePickerTemplate: (datePickerProperties: DatePicker) => TemplateFnReturnType;
  datePickerWithLabelTemplate: (datePicker: TemplateFnReturnType, id: string, label: string) => TemplateFnReturnType;
  datePickerShowByScriptingTemplate: (datePicker: TemplateFnReturnType, id: string) => TemplateFnReturnType;
  decorator: (story: ArgsStoryFn<TemplateFnReturnType>) => TemplateFnReturnType;
}

export function storiesOfDatePicker<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    datePickerTemplate,
    datePickerWithLabelTemplate,
    datePickerShowByScriptingTemplate,
    decorator
  }: DatePickerParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(datePickerArgsMapper, datePickerTemplate);

  const stories = storiesOf('Date Picker', mainModule)
    .addParameters({
      options: {
        // https://github.com/storybookjs/storybook/issues/12074#issuecomment-961294555
        enableShortcuts: false
      },
      docs: {
        page: readme
      },
      args: {
        label: 'Datum',
        disabled: false
      },
      argTypes: datePickerArgTypes
    });

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
    (a: Args | undefined) => {
      if (!a) {
        throw new ArgsError();
      }

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
