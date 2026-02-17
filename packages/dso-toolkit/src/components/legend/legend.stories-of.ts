import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, PartialStoryFn, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { StoriesParameters, StoryObj } from "../../template-container.js";

import {
  LegendArgs,
  kaartlagenTabItem,
  legendArgTypes,
  legendArgs,
  legendArgsMapper,
  legendaTabItem,
} from "./legend.args.js";
import { Legend, LegendMode } from "./legend.models";

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
  decorator: (story: PartialStoryFn) => TemplateFnReturnType;
}

interface LegendTemplates<TemplateFnReturnType> {
  legendTemplate: (legendProperties: Legend<TemplateFnReturnType>) => TemplateFnReturnType;
  legendaRichContent: (
    mode: LegendMode,
    dsoLegendGroupModeChange?: (e: CustomEvent) => void,
    dsoDelete?: (e: CustomEvent) => void,
  ) => TemplateFnReturnType;
  kaartlagenRichContent: (
    mode: LegendMode,
    dsoLegendGroupModeChange?: (e: CustomEvent) => void,
    dsoDelete?: (e: CustomEvent) => void,
  ) => TemplateFnReturnType;
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
      decorators: [(story) => decorator(story)],
      render: templateContainer.render(storyTemplates, (args, { legendTemplate, legendaRichContent }) => {
        const modeChangeHandler = (e: CustomEvent) => args.dsoLegendGroupModeChange(e.detail);
        const deleteHandler = (e: CustomEvent) => args.dsoDelete(e.detail);
        return legendTemplate(legendArgsMapper(args, legendaRichContent(args.mode, modeChangeHandler, deleteHandler)));
      }),
    },
    Kaartlagen: {
      args: { tabItems: [legendaTabItem, { ...kaartlagenTabItem, active: true }] },
      decorators: [(story) => decorator(story)],
      render: templateContainer.render(storyTemplates, (args, { legendTemplate, kaartlagenRichContent }) => {
        const modeChangeHandler = (e: CustomEvent) => args.dsoLegendGroupModeChange(e.detail);
        const deleteHandler = (e: CustomEvent) => args.dsoDelete(e.detail);
        return legendTemplate(
          legendArgsMapper(args, kaartlagenRichContent(args.mode, modeChangeHandler, deleteHandler)),
        );
      }),
    },
  };
}
