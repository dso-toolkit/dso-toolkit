import { Addon_DecoratorFunction } from "@storybook/types";
import { v4 as uuidv4 } from "uuid";

import { StoriesOfArguments, storiesOfFactory } from "../../storybook/index.js";

import {
  DatePickerLegacyArgs,
  DatePickerLegacyArgsMapper,
  DatePickerLegacyArgTypes,
} from "./date-picker-legacy.args.js";
import { DatePickerLegacy } from "./date-picker-legacy.models.js";

export interface DatePickerLegacyTemplates<TemplateFnReturnType> {
  datePickerLegacyTemplate: (DatePickerLegacyProperties: DatePickerLegacy) => TemplateFnReturnType;
  datePickerLegacyWithLabelTemplate: (
    datePickerLegacy: TemplateFnReturnType,
    id: string,
    label: string,
  ) => TemplateFnReturnType;
  datePickerLegacyShowByScriptingTemplate: (datePickerLegacy: TemplateFnReturnType, id: string) => TemplateFnReturnType;
}

export interface DatePickerLegacyParameters<TemplateFnReturnType> {
  decorator: Addon_DecoratorFunction<TemplateFnReturnType>;
}

export function storiesOfDatePickerLegacy<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    DatePickerLegacyTemplates<TemplateFnReturnType>
  >,
  { decorator }: DatePickerLegacyParameters<TemplateFnReturnType>,
) {
  return storiesOfFactory("Date Picker (Legacy)", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: DatePickerLegacyArgTypes,
      options: {
        // https://github.com/storybookjs/storybook/issues/12074#issuecomment-961294555
        enableShortcuts: false,
      },
      args: {
        label: "Datum",
        disabled: false,
      },
    });

    const template = templateMapper<DatePickerLegacyArgs>((args, { datePickerLegacyTemplate }) =>
      datePickerLegacyTemplate(DatePickerLegacyArgsMapper(args)),
    );

    stories.add("default", template);

    stories.add("disabled", template, {
      args: {
        disabled: true,
      },
    });

    stories.add("invalid", template, {
      args: {
        invalid: true,
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

    stories.add("month range", template, {
      args: {
        min: "3-8-2020",
        max: "28-3-2022",
      },
    });

    stories.add(
      "with label",
      templateMapper<DatePickerLegacyArgs>((args, { datePickerLegacyTemplate, datePickerLegacyWithLabelTemplate }) =>
        datePickerLegacyWithLabelTemplate(
          datePickerLegacyTemplate(DatePickerLegacyArgsMapper(args)),
          args.id || uuidv4(),
          "Selecteer datum",
        ),
      ),
      {
        args: {
          id: uuidv4(),
        },
      },
    );

    stories.add(
      "show by scripting",
      templateMapper<DatePickerLegacyArgs>(
        (args, { datePickerLegacyTemplate, datePickerLegacyShowByScriptingTemplate }) =>
          datePickerLegacyShowByScriptingTemplate(
            datePickerLegacyTemplate(DatePickerLegacyArgsMapper(args)),
            args.id || uuidv4(),
          ),
      ),
      {
        args: {
          id: uuidv4(),
        },
      },
    );

    stories.add("narrow input", template, {
      decorators: [decorator],
    });

    return stories;
  });
}
