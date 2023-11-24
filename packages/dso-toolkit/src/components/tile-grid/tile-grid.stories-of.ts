import { TileGridArgs, tileGridArgTypes } from "./tile-grid.args.js";
import { TileGrid } from "../tile-grid/tile-grid.models.js";
import { tiles } from "./tile-grid.content.js";
import { StoriesOfArguments, storiesOfFactory } from "../../storybook/index.js";

export interface TileGridTemplates<TemplateFnReturnType> {
  tileGridTemplate: (tileGridProperties: TileGrid) => TemplateFnReturnType;
}

export function storiesOfTileGrid<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    TileGridTemplates<TemplateFnReturnType>
  >,
) {
  return storiesOfFactory("Tile Grid", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: tileGridArgTypes,
      controls: {
        hideNoControlsWarning: true,
      },
    });

    stories.add(
      "Tile Grid",
      templateMapper<TileGridArgs>((_args, { tileGridTemplate }) => tileGridTemplate({ tiles })),
    );

    return stories;
  });
}
