import { ComponentAnnotations, Renderer } from "@storybook/types";

import { StoriesParameters, StoryObj } from "../../template-container.js";
import { compiler } from "markdown-to-jsx";
import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { MarkBarArgs, markBarArgTypes, markBarArgsMapper, markBarArgs } from "./mark-bar.args.js";
import { MarkBar } from "./mark-bar.models.js";

type MarkBarStory = StoryObj<MarkBarArgs, Renderer>;

interface MarkBarStories {
  Default: MarkBarStory;
}

interface MarkBarStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<Implementation, Templates, TemplateFnReturnType, MarkBarTemplates<TemplateFnReturnType>> {}

interface MarkBarTemplates<TemplateFnReturnType> {
  markBarTemplate: (markBarProperties: MarkBar) => TemplateFnReturnType;
}

export function markBarMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  MarkBarArgs
> {
  return {
    args: markBarArgs,
    argTypes: markBarArgTypes,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function markBarStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: MarkBarStoriesParameters<Implementation, Templates, TemplateFnReturnType>): MarkBarStories {
  return {
    Default: {
      render: templateContainer.render(storyTemplates, (args, { markBarTemplate }) =>
        markBarTemplate(markBarArgsMapper(args))
      ),
    },
  };
}
