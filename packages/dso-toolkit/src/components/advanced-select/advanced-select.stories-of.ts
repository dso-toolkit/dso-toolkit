import { ComponentAnnotations, Renderer } from "@storybook/types";

import { AdvancedSelectArgs, advancedSelectArgTypes, advancedSelectArgsMapper } from "./advanced-select.args.js";
import { AdvancedSelect } from "./advanced-select.models.js";

import { StoriesParameters, StoryObj } from "../../template-container.js";
import { compiler } from "markdown-to-jsx";
import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { options } from "./advanced-select.content.js";

type AdvancedSelectStory = StoryObj<AdvancedSelectArgs, Renderer>;

interface AdvancedSelectStories {
  Default: AdvancedSelectStory;
}

interface AdvancedSelectStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    AdvancedSelectTemplates<TemplateFnReturnType>
  > {}

interface AdvancedSelectTemplates<TemplateFnReturnType> {
  advancedSelectTemplate: (advancedSelectProperties: AdvancedSelect<unknown>) => TemplateFnReturnType;
}

export function advancedSelectMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  AdvancedSelectArgs
> {
  return {
    argTypes: advancedSelectArgTypes,
    args: {},
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function advancedSelectStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: AdvancedSelectStoriesParameters<Implementation, Templates, TemplateFnReturnType>): AdvancedSelectStories {
  return {
    Default: {
      args: {},
      render: templateContainer.render(storyTemplates, (args, { advancedSelectTemplate }) =>
        advancedSelectTemplate(advancedSelectArgsMapper(args, options)),
      ),
    },
  };
}
