import { ComponentAnnotations, Renderer } from "@storybook/types";

import {
  DescriptionArgs,
  descriptionArgsMapper,
  descriptionArgTypes,
  DescriptionExampleArgs,
  descriptionExampleArgTypes,
} from "./description.args.js";
import { termContent, descriptionExample } from "./description.content.js";
import { Description } from "./description.models.js";

import { StoriesParameters, StoryObj } from "../../template-container";
import { compiler } from "markdown-to-jsx";
import { MetaOptions } from "../../storybook/meta-options.interface";

type DescriptionStory = StoryObj<DescriptionArgs, Renderer>;

interface DescriptionStories {
  Term: DescriptionStory;
  Example: DescriptionStory;
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
  exampleTemplate: (exampleData: ReturnType<typeof descriptionExample>) => TemplateFnReturnType;
}

export function descriptionMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  DescriptionArgs | DescriptionExampleArgs
> {
  return {
    argTypes: descriptionArgTypes,
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
      render: templateContainer.render(storyTemplates, (args, { descriptionTemplate }) =>
        descriptionTemplate(descriptionArgsMapper(args)),
      ),
    },
    Example: {
      args: {
        openTerm: false,
      },
      argTypes: descriptionArgTypes,
      render: templateContainer.render(storyTemplates, (args, { exampleTemplate }) =>
        exampleTemplate(descriptionExample(args.openTerm)),
      ),
    },
  };
}
