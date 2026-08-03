import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters2, StoryObj } from "../../template-container";

import { RichContentArgs, richContentArgTypes, richContentArgsMapper } from "./rich-content.args.js";
import { RichContent } from "./rich-content.models.js";

interface RichContentStories<TemplateFnReturnType> {
  RichContent: StoryObj<RichContentArgs<TemplateFnReturnType>, Renderer>;
}

interface RichContentStoriesParameters<TemplateFnReturnType> extends StoriesParameters2<
  RichContentTemplates<TemplateFnReturnType>
> {}

export interface RichContentTemplates<TemplateFnReturnType> {
  richContentTemplate: (richContentProperties: RichContent<TemplateFnReturnType>) => TemplateFnReturnType;
  children: TemplateFnReturnType;
}

export function richContentMeta<TRenderer extends Renderer, TemplateFnReturnType>({
  readme,
}: MetaOptions = {}): ComponentAnnotations<TRenderer, RichContentArgs<TemplateFnReturnType>> {
  return {
    argTypes: richContentArgTypes,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function richContentStories<TemplateFnReturnType>({
  storyTemplates,
}: RichContentStoriesParameters<TemplateFnReturnType>): RichContentStories<TemplateFnReturnType> {
  return {
    RichContent: {
      render: (args: RichContentArgs<TemplateFnReturnType>) =>
        storyTemplates().richContentTemplate(richContentArgsMapper(args, storyTemplates().children)),
    },
  };
}
