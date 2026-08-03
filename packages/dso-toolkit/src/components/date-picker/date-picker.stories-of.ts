import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, PartialStoryFn, Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";
import { v4 as uuidv4 } from "uuid";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters2, StoryObj } from "../../template-container";

import { DatePickerArgs, datePickerArgTypes, datePickerArgsMapper } from "./date-picker.args.js";
import { DatePicker } from "./date-picker.models.js";

export type DatePickerDecorator<TemplateFnReturnType> = (story: PartialStoryFn) => TemplateFnReturnType;

type DatePickerStory = StoryObj<DatePickerArgs, Renderer>;

interface DatePickerStories {
  Default: DatePickerStory;
  Disabled: DatePickerStory;
  Invalid: DatePickerStory;
  MonthRange: DatePickerStory;
  NarrowInput: DatePickerStory;
  WithLabel: DatePickerStory;
  WithMinAndMax: DatePickerStory;
  WithValue: DatePickerStory;
}

export interface DatePickerTemplates<TemplateFnReturnType> {
  datePickerTemplate: (datePickerProperties: DatePicker) => TemplateFnReturnType;
  datePickerWithLabelTemplate: (datePicker: TemplateFnReturnType, id: string, label: string) => TemplateFnReturnType;
}

interface DatePickerStoriesParameters<TemplateFnReturnType> extends StoriesParameters2<
  DatePickerTemplates<TemplateFnReturnType>
> {
  decorator: DatePickerDecorator<TemplateFnReturnType>;
}

export function datePickerMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  DatePickerArgs
> {
  return {
    argTypes: datePickerArgTypes,
    args: {
      label: "Datum",
      disabled: false,
      dsoDateChange: fn(),
      dsoBlur: fn(),
      dsoFocus: fn(),
      dsoKeyDown: fn(),
      dsoKeyUp: fn(),
    },
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
      options: {
        // https://github.com/storybookjs/storybook/issues/12074#issuecomment-961294555
        enableShortcuts: false,
      },
    },
  };
}

export function datePickerStories<TemplateFnReturnType>({
  storyTemplates,
  decorator,
}: DatePickerStoriesParameters<TemplateFnReturnType>): DatePickerStories {
  const render = (args: DatePickerArgs) => storyTemplates().datePickerTemplate(datePickerArgsMapper(args));

  return {
    Default: {
      render: (args) => storyTemplates().datePickerTemplate(datePickerArgsMapper(args)),
    },
    Disabled: {
      args: {
        disabled: true,
      },
      render,
    },
    Invalid: {
      args: {
        invalid: true,
      },
      render,
    },
    WithValue: {
      args: {
        value: "15-11-2020",
      },
      render,
    },
    WithMinAndMax: {
      args: {
        min: "3-1-2020",
        max: "28-1-2020",
      },
      render,
    },
    MonthRange: {
      args: {
        min: "3-8-2020",
        max: "28-3-2022",
      },
      render,
    },
    WithLabel: {
      args: {
        id: uuidv4(),
      },
      render: (args) =>
        storyTemplates().datePickerWithLabelTemplate(
          storyTemplates().datePickerTemplate(datePickerArgsMapper(args)),
          args.id || uuidv4(),
          "Selecteer datum",
        ),
    },
    NarrowInput: {
      decorators: [(story) => decorator(story)],
      render,
    },
  };
}
