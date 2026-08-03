import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters2, StoryObj } from "../../template-container";

import { InfoButtonArgs, infoButtonArgTypes, infoButtonArgsMapper } from "./info-button.args.js";
import { InfoButton } from "./info-button.models.js";

type InfoButtonStory = StoryObj<InfoButtonArgs, Renderer>;

interface InfoButtonStories {
  Default: InfoButtonStory;
  Information: InfoButtonStory;
}

export interface InfoButtonTemplates<TemplateFnReturnType> {
  infoButtonTemplate: (infoButtonProperties: InfoButton<TemplateFnReturnType>) => TemplateFnReturnType;
  children?: TemplateFnReturnType;
}

interface InfoButtonStoriesParameters<TemplateFnReturnType> extends StoriesParameters2<
  InfoButtonTemplates<TemplateFnReturnType>
> {}

export function infoButtonMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  InfoButtonArgs
> {
  return {
    argTypes: infoButtonArgTypes,
    args: {
      label: "Toelichting bij vraag",
      dsoToggle: fn(),
    },
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

const baseStoryParameters = {
  parameters: { layout: "centered" },
};

export function infoButtonStories<TemplateFnReturnType>({
  storyTemplates,
}: InfoButtonStoriesParameters<TemplateFnReturnType>): InfoButtonStories {
  const render = (args: InfoButtonArgs) =>
    storyTemplates().infoButtonTemplate(infoButtonArgsMapper(args, storyTemplates().children));

  return {
    Default: {
      ...baseStoryParameters,
      render,
    },
    Information: {
      ...baseStoryParameters,
      render,
    },
  };
}
