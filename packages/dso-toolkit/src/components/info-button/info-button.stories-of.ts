import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters, StoryObj } from "../../template-container";

import { InfoButtonArgs, infoButtonArgTypes, infoButtonArgsMapper } from "./info-button.args.js";
import { InfoButton } from "./info-button.models.js";

type InfoButtonStory = StoryObj<InfoButtonArgs, Renderer>;

interface InfoButtonStories {
  Default: InfoButtonStory;
  Information: InfoButtonStory;
  SecondaryActive: InfoButtonStory;
  SecondaryInactive: InfoButtonStory;
}

export interface InfoButtonTemplates<TemplateFnReturnType> {
  infoButtonTemplate: (infoButtonProperties: InfoButton<TemplateFnReturnType>) => TemplateFnReturnType;
  children?: TemplateFnReturnType;
}

interface InfoButtonStoriesParameters<Implementation, Templates, TemplateFnReturnType> extends StoriesParameters<
  Implementation,
  Templates,
  TemplateFnReturnType,
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

export function infoButtonStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: InfoButtonStoriesParameters<Implementation, Templates, TemplateFnReturnType>): InfoButtonStories {
  return {
    Default: {
      ...baseStoryParameters,
      render: templateContainer.render(storyTemplates, (args, { infoButtonTemplate }) =>
        infoButtonTemplate(infoButtonArgsMapper(args)),
      ),
    },
    Information: {
      ...baseStoryParameters,
      render: templateContainer.render(storyTemplates, (args, { infoButtonTemplate, children }) =>
        infoButtonTemplate(infoButtonArgsMapper(args, children)),
      ),
    },
    SecondaryActive: {
      ...baseStoryParameters,
      args: {
        active: true,
        secondary: true,
      },
      render: templateContainer.render(storyTemplates, (args, { infoButtonTemplate }) =>
        infoButtonTemplate(infoButtonArgsMapper(args)),
      ),
    },
    SecondaryInactive: {
      ...baseStoryParameters,
      args: {
        active: false,
        secondary: true,
      },
      render: templateContainer.render(storyTemplates, (args, { infoButtonTemplate }) =>
        infoButtonTemplate(infoButtonArgsMapper(args)),
      ),
    },
  };
}
