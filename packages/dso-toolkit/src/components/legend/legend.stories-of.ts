import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { StoriesParameters, StoryObj } from "../../template-container.js";

import { LegendArgs, legendArgTypes, legendArgs, legendArgsMapper } from "./legend.args.js";
import { Legend } from "./legend.models.js";

type LegendStory = StoryObj<LegendArgs, Renderer>;

interface LegendStories {
  Default: LegendStory;
}

interface LegendStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<Implementation, Templates, TemplateFnReturnType, LegendTemplates<TemplateFnReturnType>> {}

interface LegendTemplates<TemplateFnReturnType> {
  legendTemplate: (legendProperties: Legend<TemplateFnReturnType>) => TemplateFnReturnType;
}

export function legendMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  LegendArgs
> {
  return {
    argTypes: legendArgTypes,
    args: legendArgs,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function legendStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: LegendStoriesParameters<Implementation, Templates, TemplateFnReturnType>): LegendStories {
  return {
    Default: {
      render: templateContainer.render(storyTemplates, (args, { legendTemplate }) =>
        legendTemplate(legendArgsMapper(args)),
      ),
    },
  };
}
