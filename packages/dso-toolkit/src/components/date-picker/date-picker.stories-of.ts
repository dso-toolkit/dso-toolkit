import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, PartialStoryFn, Renderer } from "storybook/internal/types";
import { v4 as uuidv4 } from "uuid";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters, StoryObj } from "../../template-container";

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

interface DatePickerStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
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

export function datePickerStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
  decorator,
}: DatePickerStoriesParameters<Implementation, Templates, TemplateFnReturnType>): DatePickerStories {
  return {
    Default: {
      render: templateContainer.render(storyTemplates, (args, { datePickerTemplate }) =>
        datePickerTemplate(datePickerArgsMapper(args)),
      ),
    },
    Disabled: {
      args: {
        disabled: true,
      },
      render: templateContainer.render(storyTemplates, (args, { datePickerTemplate }) =>
        datePickerTemplate(datePickerArgsMapper(args)),
      ),
    },
    Invalid: {
      args: {
        invalid: true,
      },
      render: templateContainer.render(storyTemplates, (args, { datePickerTemplate }) =>
        datePickerTemplate(datePickerArgsMapper(args)),
      ),
    },
    WithValue: {
      args: {
        value: "15-11-2020",
      },
      render: templateContainer.render(storyTemplates, (args, { datePickerTemplate }) =>
        datePickerTemplate(datePickerArgsMapper(args)),
      ),
    },
    WithMinAndMax: {
      args: {
        min: "3-1-2020",
        max: "28-1-2020",
      },
      render: templateContainer.render(storyTemplates, (args, { datePickerTemplate }) =>
        datePickerTemplate(datePickerArgsMapper(args)),
      ),
    },
    MonthRange: {
      args: {
        min: "3-8-2020",
        max: "28-3-2022",
      },
      render: templateContainer.render(storyTemplates, (args, { datePickerTemplate }) =>
        datePickerTemplate(datePickerArgsMapper(args)),
      ),
    },
    WithLabel: {
      args: {
        id: uuidv4(),
      },
      render: templateContainer.render(storyTemplates, (args, { datePickerTemplate, datePickerWithLabelTemplate }) =>
        datePickerWithLabelTemplate(
          datePickerTemplate(datePickerArgsMapper(args)),
          args.id || uuidv4(),
          "Selecteer datum",
        ),
      ),
    },
    NarrowInput: {
      decorators: [(story) => decorator(story)],
      render: templateContainer.render(storyTemplates, (args, { datePickerTemplate }) =>
        datePickerTemplate(datePickerArgsMapper(args)),
      ),
    },
  };
}
