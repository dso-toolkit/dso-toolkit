import { DecoratorFunction } from "@storybook/addons";
import { v4 as uuidv4 } from "uuid";

import { StoriesOfArguments, storiesOfFactory } from "../../storybook/stories-of-factory";

import { DatePickerArgs, datePickerArgsMapper, datePickerArgTypes } from "./date-picker.args";
import { DatePicker } from "./date-picker.models";

export interface DatePickerTemplates<TemplateFnReturnType> {
  datePickerTemplate: (datePickerProperties: DatePicker) => TemplateFnReturnType;
  datePickerWithLabelTemplate: (datePicker: TemplateFnReturnType, id: string, label: string) => TemplateFnReturnType;
  datePickerShowByScriptingTemplate: (datePicker: TemplateFnReturnType, id: string) => TemplateFnReturnType;
}

export interface DatePickerParameters<TemplateFnReturnType> {
  decorator: DecoratorFunction<TemplateFnReturnType>;
}

export function storiesOfDatePicker<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    DatePickerTemplates<TemplateFnReturnType>
  >,
  { decorator }: DatePickerParameters<TemplateFnReturnType>
) {
  return storiesOfFactory("Date Picker", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: datePickerArgTypes,
      options: {
        // https://github.com/storybookjs/storybook/issues/12074#issuecomment-961294555
        enableShortcuts: false,
      },
      args: {
        label: "Datum",
        disabled: false,
      },
    });

    const template = templateMapper<DatePickerArgs>((args, { datePickerTemplate }) =>
      datePickerTemplate(datePickerArgsMapper(args))
    );

    stories.add("default", template);

    stories.add("disabled", template, {
      args: {
        disabled: true,
      },
    });

    stories.add("with value", template, {
      args: {
        value: "15-11-2020",
      },
    });

    stories.add("with min and max", template, {
      args: {
        min: "3-1-2020",
        max: "28-1-2020",
      },
    });

    stories.add(
      "with label",
      templateMapper<DatePickerArgs>((args, { datePickerTemplate, datePickerWithLabelTemplate }) =>
        datePickerWithLabelTemplate(
          datePickerTemplate(datePickerArgsMapper(args)),
          args.id || uuidv4(),
          "Selecteer datum"
        )
      ),
      {
        args: {
          id: uuidv4(),
        },
      }
    );

    stories.add(
      "show by scripting",
      templateMapper<DatePickerArgs>((args, { datePickerTemplate, datePickerShowByScriptingTemplate }) =>
        datePickerShowByScriptingTemplate(datePickerTemplate(datePickerArgsMapper(args)), args.id || uuidv4())
      ),
      {
        args: {
          id: uuidv4(),
        },
      }
    );

    stories.add("narrow input", template, {
      decorators: [decorator],
    });

    return stories;
  });
}
