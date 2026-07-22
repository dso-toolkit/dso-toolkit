import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { StoriesParameters, StoryObj } from "../../template-container.js";

import {
  AdvancedSelectArgs,
  advancedSelectArgTypes,
  advancedSelectArgs,
  advancedSelectArgsMapper,
} from "./advanced-select.args.js";
import { placeholderOptions } from "./advanced-select.content";
import { AdvancedSelect } from "./advanced-select.models.js";

type AdvancedSelectStory = StoryObj<AdvancedSelectArgs, Renderer>;

interface AdvancedSelectStories {
  Default: AdvancedSelectStory;
  Placeholder: AdvancedSelectStory;
}

interface AdvancedSelectStoriesParameters<Implementation, Templates, TemplateFnReturnType> extends StoriesParameters<
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
    args: advancedSelectArgs,
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
  const render = templateContainer.render(storyTemplates, (args: AdvancedSelectArgs, { advancedSelectTemplate }) =>
    advancedSelectTemplate(advancedSelectArgsMapper(args)),
  );

  return {
    Default: {
      render,
    },
    Placeholder: {
      args: {
        optionsOrGroup: placeholderOptions,
      },
      render,
    },
  };
}
