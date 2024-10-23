import { ComponentAnnotations, Renderer } from "@storybook/types";

import { RichContentArgs, richContentArgsMapper, richContentArgTypes } from "./rich-content.args.js";
import { RichContent } from "./rich-content.models.js";

import { StoriesParameters, StoryObj } from "../../template-container";
import { compiler } from "markdown-to-jsx";
import { MetaOptions } from "../../storybook/meta-options.interface";

interface RichContentStories<TemplateFnReturnType> {
  RichContent: StoryObj<RichContentArgs<TemplateFnReturnType>, Renderer>;
}

interface RichContentStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
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

export function richContentStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: RichContentStoriesParameters<
  Implementation,
  Templates,
  TemplateFnReturnType
>): RichContentStories<TemplateFnReturnType> {
  return {
    RichContent: {
      render: templateContainer.render(
        storyTemplates,
        (args: RichContentArgs<TemplateFnReturnType>, { richContentTemplate, children }) =>
          richContentTemplate(richContentArgsMapper(args, children)),
      ),
    },
  };
}
