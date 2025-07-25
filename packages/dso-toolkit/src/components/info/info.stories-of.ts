import { ComponentAnnotations, Renderer } from "@storybook/types";
import { compiler } from "markdown-to-jsx";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters, StoryObj } from "../../template-container";

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

interface InfoStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<Implementation, Templates, TemplateFnReturnType, InfoTemplates<TemplateFnReturnType>> {}

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

export function infoStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: InfoStoriesParameters<Implementation, Templates, TemplateFnReturnType>): InfoStories {
  return {
    Default: {
      args: {
        active: true,
      },
      render: templateContainer.render(storyTemplates, (args, { infoTemplate, richContent }) =>
        infoTemplate(infoArgsMapper(args, richContent)),
      ),
    },
    Fixed: {
      args: {
        fixed: true,
      },
      render: templateContainer.render(storyTemplates, (args, { infoTemplate, richContent }) =>
        infoTemplate(infoArgsMapper(args, richContent)),
      ),
    },
  };
}
