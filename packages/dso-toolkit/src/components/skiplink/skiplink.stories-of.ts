import { ComponentAnnotations, Renderer } from "@storybook/types";
import { compiler } from "markdown-to-jsx";

import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { StoriesParameters, StoryObj } from "../../template-container.js";

import { SkiplinkArgs, skiplinkArgTypes, skiplinkArgs, skiplinkArgsMapper } from "./skiplink.args.js";
import { Skiplink } from "./skiplink.models.js";

type SkiplinkStory = StoryObj<SkiplinkArgs, Renderer>;

interface SkiplinkStories {
  Default: SkiplinkStory;
}

interface SkiplinkStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<Implementation, Templates, TemplateFnReturnType, SkiplinkTemplates<TemplateFnReturnType>> {}

interface SkiplinkTemplates<TemplateFnReturnType> {
  skiplinkTemplate: (skiplinkProperties: Skiplink) => TemplateFnReturnType;
}

export function skiplinkMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  SkiplinkArgs
> {
  return {
    argTypes: skiplinkArgTypes,
    args: skiplinkArgs,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function skiplinkStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: SkiplinkStoriesParameters<Implementation, Templates, TemplateFnReturnType>): SkiplinkStories {
  return {
    Default: {
      render: templateContainer.render(storyTemplates, (args, { skiplinkTemplate }) =>
        skiplinkTemplate(skiplinkArgsMapper(args)),
      ),
    },
  };
}
