import { ComponentAnnotations, Renderer } from "@storybook/types";
import { compiler } from "markdown-to-jsx";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters, StoryObj } from "../../template-container";

import { InfoButtonArgs, infoButtonArgTypes, infoButtonArgsMapper } from "./info-button.args.js";
import { InfoButton } from "./info-button.models.js";

type InfoButtonStory = StoryObj<InfoButtonArgs, Renderer>;

interface InfoButtonStories {
  Active: InfoButtonStory;
  Inactive: InfoButtonStory;
  SecondaryActive: InfoButtonStory;
  SecondaryInactive: InfoButtonStory;
}

export interface InfoButtonTemplates<TemplateFnReturnType> {
  infoButtonTemplate: (infoButtonProperties: InfoButton) => TemplateFnReturnType;
}

interface InfoButtonStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
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

export function infoButtonStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: InfoButtonStoriesParameters<Implementation, Templates, TemplateFnReturnType>): InfoButtonStories {
  return {
    Active: {
      args: {
        active: true,
      },
      render: templateContainer.render(storyTemplates, (args, { infoButtonTemplate }) =>
        infoButtonTemplate(infoButtonArgsMapper(args)),
      ),
    },
    Inactive: {
      args: {
        active: false,
      },
      render: templateContainer.render(storyTemplates, (args, { infoButtonTemplate }) =>
        infoButtonTemplate(infoButtonArgsMapper(args)),
      ),
    },
    SecondaryActive: {
      args: {
        active: true,
        secondary: true,
      },
      render: templateContainer.render(storyTemplates, (args, { infoButtonTemplate }) =>
        infoButtonTemplate(infoButtonArgsMapper(args)),
      ),
    },
    SecondaryInactive: {
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
