import { ComponentAnnotations, Renderer } from "@storybook/types";

import { SkiplinksArgs, skiplinksArgs, skiplinksArgTypes, skiplinksArgsMapper } from "./skiplinks.args.js";
import { Skiplinks } from "./skiplinks.models.js";

import { StoriesParameters, StoryObj } from "../../template-container.js";
import { compiler } from "markdown-to-jsx";
import { MetaOptions } from "../../storybook/meta-options.interface.js";

type SkiplinksStory = StoryObj<SkiplinksArgs, Renderer>;

interface SkiplinksStories {
  Default: SkiplinksStory;
}

interface SkiplinksStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    SkiplinksTemplates<TemplateFnReturnType>
  > {}

interface SkiplinksTemplates<TemplateFnReturnType> {
  skiplinksTemplate: (skiplinksProperties: Skiplinks) => TemplateFnReturnType;
}

export function skiplinksMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  SkiplinksArgs
> {
  return {
    argTypes: skiplinksArgTypes,
    args: skiplinksArgs,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function skiplinksStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: SkiplinksStoriesParameters<Implementation, Templates, TemplateFnReturnType>): SkiplinksStories {
  return {
    Default: {
      render: templateContainer.render(storyTemplates, (args, { skiplinksTemplate }) =>
        skiplinksTemplate(skiplinksArgsMapper(args)),
      ),
    },
  };
}
