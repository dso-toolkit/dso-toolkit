import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { StoriesParameters, StoryObj } from "../../template-container.js";
import { LegendItemDecorator, legendItemDemoCss } from "../legend-item";

import {
  LegendArgs,
  kaartlagenTabItem,
  legendArgTypes,
  legendArgs,
  legendArgsMapper,
  legendaTabItem,
} from "./legend.args.js";
import { Legend } from "./legend.models";

type LegendStory = StoryObj<LegendArgs, Renderer>;

interface LegendStories {
  Legenda: LegendStory;
  Kaartlagen: LegendStory;
}

interface LegendStoriesParameters<Implementation, Templates, TemplateFnReturnType> extends StoriesParameters<
  Implementation,
  Templates,
  TemplateFnReturnType,
  LegendTemplates<TemplateFnReturnType>
> {
  decorator: LegendItemDecorator<TemplateFnReturnType>;
}

interface LegendTemplates<TemplateFnReturnType> {
  legendTemplate: (legendProperties: Legend<TemplateFnReturnType>) => TemplateFnReturnType;
  legendaRichContent: TemplateFnReturnType;
  kaartlagenRichContent: TemplateFnReturnType;
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
  decorator,
}: LegendStoriesParameters<Implementation, Templates, TemplateFnReturnType>): LegendStories {
  return {
    Legenda: {
      decorators: [(story) => decorator(story, legendItemDemoCss)],
      render: templateContainer.render(storyTemplates, (args, { legendTemplate, legendaRichContent }) =>
        legendTemplate(legendArgsMapper(args, legendaRichContent)),
      ),
    },
    Kaartlagen: {
      args: { tabItems: [legendaTabItem, { ...kaartlagenTabItem, active: true }] },
      decorators: [(story) => decorator(story, legendItemDemoCss)],
      render: templateContainer.render(storyTemplates, (args, { legendTemplate, kaartlagenRichContent }) =>
        legendTemplate(legendArgsMapper(args, kaartlagenRichContent)),
      ),
    },
  };
}
