import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, PartialStoryFn, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters, StoryObj } from "../../template-container";
import { HighlightBox } from "../highlight-box";
import { Tile } from "../tile";

import { highlightBoxes, tiles } from "./row-equal-heights.content.js";

export type RowEqualHeightsDecorator<TemplateFnReturnType> = (story: PartialStoryFn) => TemplateFnReturnType;

type RowEqualHeightsStory = StoryObj<{}, Renderer>;

interface RowEqualHeightsStories {
  HighlightBoxes: RowEqualHeightsStory;
  Tiles: RowEqualHeightsStory;
}

interface RowEqualHeightsStoriesParameters<Implementation, Templates, TemplateFnReturnType> extends StoriesParameters<
  Implementation,
  Templates,
  TemplateFnReturnType,
  RowEqualHeightsTemplates<TemplateFnReturnType>
> {
  decorator: RowEqualHeightsDecorator<TemplateFnReturnType>;
}

export interface RowEqualHeightsTemplates<TemplateFnReturnType> {
  highlightBoxExample: (highlightboxes: HighlightBox<string>[]) => TemplateFnReturnType;
  tileExample: (tiles: Tile[]) => TemplateFnReturnType;
}

export function rowEqualHeightsMeta<TRenderer extends Renderer>({
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

export function rowEqualHeightsStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
  decorator,
}: RowEqualHeightsStoriesParameters<Implementation, Templates, TemplateFnReturnType>): RowEqualHeightsStories {
  return {
    HighlightBoxes: {
      decorators: [(story) => decorator(story)],
      render: templateContainer.render(storyTemplates, (_args, { highlightBoxExample }) =>
        highlightBoxExample(highlightBoxes),
      ),
    },
    Tiles: {
      decorators: [(story) => decorator(story)],
      render: templateContainer.render(storyTemplates, (_args, { tileExample }) => tileExample(tiles)),
    },
  };
}
