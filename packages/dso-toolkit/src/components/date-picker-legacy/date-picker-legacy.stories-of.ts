import { ComponentAnnotations, PartialStoryFn, Renderer } from "@storybook/types";
import { v4 as uuidv4 } from "uuid";

import {
  DatePickerLegacyArgs,
  datePickerLegacyArgsMapper,
  datePickerLegacyArgTypes,
} from "./date-picker-legacy.args.js";
import { DatePickerLegacy } from "./date-picker-legacy.models.js";

import { StoriesParameters, StoryObj } from "../../template-container";
import { compiler } from "markdown-to-jsx";
import { MetaOptions } from "../../storybook/meta-options.interface";

export type DatePickerLegacyDecorator<TemplateFnReturnType> = (story: PartialStoryFn) => TemplateFnReturnType;

type DatePickerLegacyStory = StoryObj<DatePickerLegacyArgs, Renderer>;

interface DatePickerStories {
  Default: DatePickerLegacyStory;
  Disabled: DatePickerLegacyStory;
  Invalid: DatePickerLegacyStory;
  MonthRange: DatePickerLegacyStory;
  NarrowInput: DatePickerLegacyStory;
  ShowByScripting: DatePickerLegacyStory;
  WithLabel: DatePickerLegacyStory;
  WithMinAndMax: DatePickerLegacyStory;
  WithValue: DatePickerLegacyStory;
}

export interface DatePickerLegacyTemplates<TemplateFnReturnType> {
  datePickerLegacyTemplate: (datePickerLegacyProperties: DatePickerLegacy) => TemplateFnReturnType;
  datePickerLegacyWithLabelTemplate: (
    datePickerLegacy: TemplateFnReturnType,
    id: string,
    label: string,
  ) => TemplateFnReturnType;
  datePickerLegacyShowByScriptingTemplate: (datePickerLegacy: TemplateFnReturnType, id: string) => TemplateFnReturnType;
}

interface DatePickerLegacyStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    DatePickerLegacyTemplates<TemplateFnReturnType>
  > {
  decorator: DatePickerLegacyDecorator<TemplateFnReturnType>;
}

export function datePickerLegacyMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  DatePickerLegacyArgs
> {
  return {
    argTypes: datePickerLegacyArgTypes,
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

export function datePickerLegacyStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
  decorator,
}: DatePickerLegacyStoriesParameters<Implementation, Templates, TemplateFnReturnType>): DatePickerStories {
  return {
    Default: {
      render: templateContainer.render(storyTemplates, (args, { datePickerLegacyTemplate }) =>
        datePickerLegacyTemplate(datePickerLegacyArgsMapper(args)),
      ),
    },
    Disabled: {
      args: {
        disabled: true,
      },
      render: templateContainer.render(storyTemplates, (args, { datePickerLegacyTemplate }) =>
        datePickerLegacyTemplate(datePickerLegacyArgsMapper(args)),
      ),
    },
    Invalid: {
      args: {
        invalid: true,
      },
      render: templateContainer.render(storyTemplates, (args, { datePickerLegacyTemplate }) =>
        datePickerLegacyTemplate(datePickerLegacyArgsMapper(args)),
      ),
    },
    WithValue: {
      args: {
        value: "15-11-2020",
      },
      render: templateContainer.render(storyTemplates, (args, { datePickerLegacyTemplate }) =>
        datePickerLegacyTemplate(datePickerLegacyArgsMapper(args)),
      ),
    },
    WithMinAndMax: {
      args: {
        min: "3-1-2020",
        max: "28-1-2020",
      },
      render: templateContainer.render(storyTemplates, (args, { datePickerLegacyTemplate }) =>
        datePickerLegacyTemplate(datePickerLegacyArgsMapper(args)),
      ),
    },
    MonthRange: {
      args: {
        min: "3-8-2020",
        max: "28-3-2022",
      },
      render: templateContainer.render(storyTemplates, (args, { datePickerLegacyTemplate }) =>
        datePickerLegacyTemplate(datePickerLegacyArgsMapper(args)),
      ),
    },
    WithLabel: {
      args: {
        id: uuidv4(),
      },
      render: templateContainer.render(
        storyTemplates,
        (args, { datePickerLegacyTemplate, datePickerLegacyWithLabelTemplate }) =>
          datePickerLegacyWithLabelTemplate(
            datePickerLegacyTemplate(datePickerLegacyArgsMapper(args)),
            args.id || uuidv4(),
            "Selecteer datum",
          ),
      ),
    },
    NarrowInput: {
      decorators: [(story) => decorator(story)],
      render: templateContainer.render(storyTemplates, (args, { datePickerLegacyTemplate }) =>
        datePickerLegacyTemplate(datePickerLegacyArgsMapper(args)),
      ),
    },
    ShowByScripting: {
      args: {
        id: uuidv4(),
      },
      render: templateContainer.render(
        storyTemplates,
        (args, { datePickerLegacyTemplate, datePickerLegacyShowByScriptingTemplate }) =>
          datePickerLegacyShowByScriptingTemplate(
            datePickerLegacyTemplate(datePickerLegacyArgsMapper(args)),
            args.id || uuidv4(),
          ),
      ),
    },
  };
}
