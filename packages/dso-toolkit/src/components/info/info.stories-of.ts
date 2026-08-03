import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters2, StoryObj } from "../../template-container";

import { InfoArgs, infoArgTypes, infoArgsMapper } from "./info.args.js";
import { Info } from "./info.models.js";

type InfoStory = StoryObj<InfoArgs, Renderer>;

interface InfoStories {
  Default: InfoStory;
  Fixed: InfoStory;
}

export interface InfoTemplates<TemplateFnReturnType> {
  infoTemplate: (infoProperties: Info<TemplateFnReturnType>) => TemplateFnReturnType;
  richContent: TemplateFnReturnType;
}

interface InfoStoriesParameters<TemplateFnReturnType> extends StoriesParameters2<InfoTemplates<TemplateFnReturnType>> {}

export function infoMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  InfoArgs
> {
  return {
    argTypes: infoArgTypes,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function infoStories<TemplateFnReturnType>({
  storyTemplates,
}: InfoStoriesParameters<TemplateFnReturnType>): InfoStories {
  const render = (args: InfoArgs) => storyTemplates().infoTemplate(infoArgsMapper(args, storyTemplates().richContent));

  return {
    Default: {
      args: {
        active: true,
        dsoClose: fn(),
      },
      render,
    },
    Fixed: {
      args: {
        fixed: true,
      },
      render,
    },
  };
}
