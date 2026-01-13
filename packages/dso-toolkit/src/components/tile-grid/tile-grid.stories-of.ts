import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters, StoryObj } from "../../template-container";
import { Tile } from "../tile";

import { TileGrid } from "./tile-grid.models.js";

interface TileGridStories {
  TileGrid: StoryObj<Record<string, never>, Renderer>;
}

export interface TileGridTemplates<TemplateFnReturnType> {
  tileGridTemplate: (tileGridProperties: TileGrid) => TemplateFnReturnType;
  tiles: Tile[];
}

interface TileGridStoriesParameters<Implementation, Templates, TemplateFnReturnType> extends StoriesParameters<
  Implementation,
  Templates,
  TemplateFnReturnType,
  TileGridTemplates<TemplateFnReturnType>
> {}

export function tileGridMeta<TRenderer extends Renderer>({
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

export function tileGridStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: TileGridStoriesParameters<Implementation, Templates, TemplateFnReturnType>): TileGridStories {
  return {
    TileGrid: {
      render: templateContainer.render(storyTemplates, (_args, { tileGridTemplate, tiles }) =>
        tileGridTemplate({ tiles }),
      ),
    },
  };
}
