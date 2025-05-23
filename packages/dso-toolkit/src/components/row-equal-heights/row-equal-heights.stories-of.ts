import { ComponentAnnotations, PartialStoryFn, Renderer } from "@storybook/types";
import { compiler } from "markdown-to-jsx";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters, StoryObj } from "../../template-container";
import { HighlightBox } from "../highlight-box";
import { Tile } from "../tile";
import { Whitebox } from "../whitebox";

import { highlightBoxes, tiles, whiteboxes } from "./row-equal-heights.content.js";

export type RowEqualHeightsDecorator<TemplateFnReturnType> = (story: PartialStoryFn) => TemplateFnReturnType;

type RowEqualHeightsStory = StoryObj<{}, Renderer>;

interface RowEqualHeightsStories {
  HighlightBoxes: RowEqualHeightsStory;
  Tiles: RowEqualHeightsStory;
  Whiteboxes: RowEqualHeightsStory;
}

interface RowEqualHeightsStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
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
  whiteboxExample: (whiteboxes: Whitebox[]) => TemplateFnReturnType;
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
    Whiteboxes: {
      decorators: [(story) => decorator(story)],
      render: templateContainer.render(storyTemplates, (_args, { whiteboxExample }) => whiteboxExample(whiteboxes)),
    },
  };
}
