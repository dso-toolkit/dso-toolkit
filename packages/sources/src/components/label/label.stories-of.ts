import { action } from "@storybook/addon-actions";
import { PartialStoryFn } from "@storybook/addons";

import { StoriesOfArguments, storiesOfFactory } from "../../storybook/stories-of-factory";

import { LabelArgs, labelArgsMapper, labelArgTypes } from "./label.args";
import { css } from "./label.demo";
import { Label } from "./label.models";

export interface LabelTemplates<TemplateFnReturnType> {
  labelTemplate: (labelProperties: Label) => TemplateFnReturnType;
}

export interface LabelParameters<TemplateFnReturnType> {
  decorator: (story: PartialStoryFn<TemplateFnReturnType>, css: string) => TemplateFnReturnType;
}

export function storiesOfLabel<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    LabelTemplates<TemplateFnReturnType>
  >,
  { decorator }: LabelParameters<TemplateFnReturnType>
) {
  return storiesOfFactory("Label", storiesOfArguments, (stories, templateMapper) => {
    stories
      .addParameters({
        argTypes: labelArgTypes,
        args: {
          label: "Label",
        },
      })
      .addDecorator((story) => decorator(story, css));

    const template = templateMapper<LabelArgs>((args, { labelTemplate }) => labelTemplate(labelArgsMapper(args)));

    stories.add("default", template);

    stories.add("with action", template, {
      args: {
        removable: true,
        button: {
          title: "Verwijder",
          icon: "times",
          onClick: action("Clicked remove"),
        },
      },
    });

    stories.add("truncate", template, {
      args: {
        label: "Een hele lange label die je eigenlijk visueel wil afbreken.",
        truncate: true,
        button: {
          title: "Verwijder",
          icon: "times",
          onClick: action("Clicked remove"),
        },
      },
    });

    stories.add("with symbol (image)", template, {
      args: {
        status: "bright",
        symbol: '<span class="symboolcode" data-symboolcode="vag000"></span>',
      },
    });

    stories.add("with symbol (color)", template, {
      args: {
        status: "bright",
        symbol: '<span class="symboolcode" data-symboolcode="vszt030"></span>',
      },
    });

    return stories;
  });
}
