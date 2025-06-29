import { ComponentAnnotations, PartialStoryFn, Renderer } from "@storybook/types";
import { compiler } from "markdown-to-jsx";

import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { StoriesParameters, StoryObj } from "../../template-container.js";

import { LegendItemArgs, legendItemArgTypes, legendItemArgs, legendItemArgsMapper } from "./legend-item.args.js";
import { legendItemDemoCss } from "./legend-item.demo.js";
import { LegendItem } from "./legend-item.models.js";

export type LegendItemDecorator<TemplateFnReturnType> = (story: PartialStoryFn, css: string) => TemplateFnReturnType;

type LegendItemStory = StoryObj<LegendItemArgs, Renderer>;

interface LegendItemStories {
  Default: LegendItemStory;
}

interface LegendItemStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    LegendItemTemplates<TemplateFnReturnType>
  > {
  decorator: LegendItemDecorator<TemplateFnReturnType>;
}

interface LegendItemTemplates<TemplateFnReturnType> {
  legendItemTemplate: (legendItemProperties: LegendItem<TemplateFnReturnType>) => TemplateFnReturnType;
  bodyWithInputRange: TemplateFnReturnType;
  defaultSymbol: TemplateFnReturnType;
}

export function legendItemMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  LegendItemArgs
> {
  return {
    argTypes: legendItemArgTypes,
    args: legendItemArgs,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function legendItemStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
  decorator,
}: LegendItemStoriesParameters<Implementation, Templates, TemplateFnReturnType>): LegendItemStories {
  return {
    Default: {
      args: {
        label: "Legenda item label",
      },
      decorators: [(story) => decorator(story, legendItemDemoCss)],
      render: templateContainer.render(
        storyTemplates,
        (args, { legendItemTemplate, defaultSymbol, bodyWithInputRange }) =>
          legendItemTemplate(legendItemArgsMapper(args, undefined, defaultSymbol, bodyWithInputRange)),
      ),
    },
  };
}
