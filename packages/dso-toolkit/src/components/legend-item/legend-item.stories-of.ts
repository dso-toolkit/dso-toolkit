import { ComponentAnnotations, PartialStoryFn, Renderer } from "@storybook/types";

import { LegendItemArgs, legendItemArgs, legendItemArgTypes, legendItemArgsMapper } from "./legend-item.args.js";
import { LegendItem } from "./legend-item.models.js";

import { StoriesParameters, StoryObj } from "../../template-container.js";
import { legendItemDemoCss } from "./legend-item.demo.js";
import { compiler } from "markdown-to-jsx";
import { MetaOptions } from "../../storybook/meta-options.interface.js";

export type LegendItemDecorator<TemplateFnReturnType> = (story: PartialStoryFn, css: string) => TemplateFnReturnType;

type LegendItemStory = StoryObj<LegendItemArgs, Renderer>;

interface LegendItemStories {
  Default: LegendItemStory;
  WithSelectable: LegendItemStory;
  Removable: LegendItemStory;
  WithSelectables: LegendItemStory;
  WithInputRange: LegendItemStory;
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
  bodyWithSelectables: TemplateFnReturnType;
  bodyWithInputRange: TemplateFnReturnType;
  defaultSymbol: TemplateFnReturnType;
  defaultLabel: TemplateFnReturnType;
  selectable: TemplateFnReturnType;
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
        removable: false,
        selectable: false,
      },
      decorators: [(story) => decorator(story, legendItemDemoCss)],
      render: templateContainer.render(storyTemplates, (args, { legendItemTemplate, defaultSymbol, defaultLabel }) =>
        legendItemTemplate(legendItemArgsMapper(args, defaultLabel, defaultSymbol)),
      ),
    },
    WithSelectable: {
      args: {
        disabledMessage: "Deze informatie is op dit moment niet beschikbaar.",
        removable: false,
        selectable: true,
      },
      decorators: [(story) => decorator(story, legendItemDemoCss)],
      render: templateContainer.render(storyTemplates, (args, { legendItemTemplate, selectable }) =>
        legendItemTemplate(legendItemArgsMapper(args, selectable)),
      ),
    },
    Removable: {
      args: {
        removable: true,
        selectable: false,
      },
      decorators: [(story) => decorator(story, legendItemDemoCss)],
      render: templateContainer.render(storyTemplates, (args, { legendItemTemplate, defaultLabel, defaultSymbol }) =>
        legendItemTemplate(legendItemArgsMapper(args, defaultLabel, defaultSymbol)),
      ),
    },
    WithSelectables: {
      args: {
        removable: false,
        selectable: false,
      },
      decorators: [(story) => decorator(story, legendItemDemoCss)],
      render: templateContainer.render(
        storyTemplates,
        (args, { legendItemTemplate, defaultLabel, defaultSymbol, bodyWithSelectables }) =>
          legendItemTemplate(legendItemArgsMapper(args, defaultLabel, defaultSymbol, bodyWithSelectables)),
      ),
    },
    WithInputRange: {
      args: {
        removable: false,
        selectable: false,
      },
      decorators: [(story) => decorator(story, legendItemDemoCss)],
      render: templateContainer.render(
        storyTemplates,
        (args, { legendItemTemplate, defaultLabel, defaultSymbol, bodyWithInputRange }) =>
          legendItemTemplate(legendItemArgsMapper(args, defaultLabel, defaultSymbol, bodyWithInputRange)),
      ),
    },
  };
}
