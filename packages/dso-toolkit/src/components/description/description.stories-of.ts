import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters, StoryObj } from "../../template-container";

import {
  DescriptionArgs,
  DescriptionExampleArgs,
  descriptionArgTypes,
  descriptionArgsMapper,
  descriptionExampleArgTypes,
} from "./description.args.js";
import { descriptionExample, termContent } from "./description.content.js";
import { Description } from "./description.models.js";

interface DescriptionStories {
  Term: StoryObj<DescriptionArgs, Renderer>;
  Example: StoryObj<DescriptionExampleArgs, Renderer>;
}

interface DescriptionStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    DescriptionTemplates<TemplateFnReturnType>
  > {}

export interface DescriptionTemplates<TemplateFnReturnType> {
  descriptionTemplate: (descriptionProperties: Description) => TemplateFnReturnType;
  exampleTemplate: (exampleData: (string | Description)[]) => TemplateFnReturnType;
}

export function descriptionMeta<TRenderer extends Renderer>({
  readme,
}: MetaOptions = {}): ComponentAnnotations<TRenderer> {
  return {
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function descriptionStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: DescriptionStoriesParameters<Implementation, Templates, TemplateFnReturnType>): DescriptionStories {
  return {
    Term: {
      args: termContent,
      argTypes: descriptionArgTypes,
      render: templateContainer.render(storyTemplates, (args, { descriptionTemplate }) =>
        descriptionTemplate(descriptionArgsMapper(args)),
      ),
    },
    Example: {
      args: {
        openTerm: false,
      },
      argTypes: descriptionExampleArgTypes,
      render: templateContainer.render(storyTemplates, (args, { exampleTemplate }) =>
        exampleTemplate(descriptionExample(args.openTerm)),
      ),
    },
  };
}
