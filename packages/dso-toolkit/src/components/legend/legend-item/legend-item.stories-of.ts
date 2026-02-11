import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, PartialStoryFn, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../../storybook/meta-options.interface.js";
import { StoriesParameters, StoryObj } from "../../../template-container.js";

import { LegendItemArgs, legendItemArgTypes, legendItemArgs, legendItemArgsMapper } from "./legend-item.args.js";
import { legendItemDemoCss } from "./legend-item.demo.js";
import { LegendItem } from "./legend-item.models.js";

export type LegendItemDecorator<TemplateFnReturnType> = (story: PartialStoryFn, css: string) => TemplateFnReturnType;

type LegendItemStory = StoryObj<LegendItemArgs, Renderer>;

interface LegendItemStories {
  Default: LegendItemStory;
  EditMode: LegendItemStory;
  NotActivatable: LegendItemStory;
  NoOptions: LegendItemStory;
  NoSymbol: LegendItemStory;
  OnlySymbol: LegendItemStory;
}

interface LegendItemStoriesParameters<Implementation, Templates, TemplateFnReturnType> extends StoriesParameters<
  Implementation,
  Templates,
  TemplateFnReturnType,
  LegendItemTemplates<TemplateFnReturnType>
> {
  decorator: LegendItemDecorator<TemplateFnReturnType>;
}

interface LegendItemTemplates<TemplateFnReturnType> {
  legendItemTemplate: (legendItemProperties: LegendItem<TemplateFnReturnType>) => TemplateFnReturnType;
  optionsWithInputRange: TemplateFnReturnType;
  defaultSymbol: TemplateFnReturnType;
  content: (label: string) => TemplateFnReturnType;
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
      decorators: [(story) => decorator(story, legendItemDemoCss)],
      render: templateContainer.render(
        storyTemplates,
        (args, { legendItemTemplate, defaultSymbol, optionsWithInputRange, content }) =>
          legendItemTemplate(legendItemArgsMapper(args, content, defaultSymbol, optionsWithInputRange)),
      ),
    },
    EditMode: {
      args: {
        mode: "edit",
      },
      decorators: [(story) => decorator(story, legendItemDemoCss)],
      render: templateContainer.render(
        storyTemplates,
        (args, { legendItemTemplate, defaultSymbol, optionsWithInputRange, content }) =>
          legendItemTemplate(legendItemArgsMapper(args, content, defaultSymbol, optionsWithInputRange)),
      ),
    },
    NotActivatable: {
      args: {
        activatable: false,
        label: "Legenda item niet activeerbaar",
      },
      decorators: [(story) => decorator(story, legendItemDemoCss)],
      render: templateContainer.render(
        storyTemplates,
        (args, { legendItemTemplate, defaultSymbol, optionsWithInputRange, content }) =>
          legendItemTemplate(legendItemArgsMapper(args, content, defaultSymbol, optionsWithInputRange)),
      ),
    },
    NoOptions: {
      args: {
        label: "Legenda item zonder opties",
      },
      decorators: [(story) => decorator(story, legendItemDemoCss)],
      render: templateContainer.render(storyTemplates, (args, { legendItemTemplate, defaultSymbol, content }) =>
        legendItemTemplate(legendItemArgsMapper(args, content, defaultSymbol)),
      ),
    },
    NoSymbol: {
      args: {
        label: "Legenda item zonder symbool",
      },
      render: templateContainer.render(storyTemplates, (args, { legendItemTemplate, optionsWithInputRange, content }) =>
        legendItemTemplate(legendItemArgsMapper(args, content, undefined, optionsWithInputRange)),
      ),
    },
    OnlySymbol: {
      args: {
        label: "Legenda item met alleen symbool",
        activatable: false,
      },
      decorators: [(story) => decorator(story, legendItemDemoCss)],
      render: templateContainer.render(storyTemplates, (args, { legendItemTemplate, defaultSymbol, content }) =>
        legendItemTemplate(legendItemArgsMapper(args, content, defaultSymbol, undefined)),
      ),
    },
  };
}
