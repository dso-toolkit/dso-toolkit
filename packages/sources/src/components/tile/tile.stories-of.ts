import { componentArgs } from "../../storybook";
import { StoriesOfArguments, storiesOfFactory } from "../../storybook/stories-of-factory";

import { TileArgs, tileArgsMapper, tileArgTypes } from "./tile.args";
import { Tile } from "./tile.models";

export interface TileTemplates<TemplateFnReturnType> {
  tileTemplate: (tileProperties: Tile) => TemplateFnReturnType;
}

export function storiesOfTile<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    TileTemplates<TemplateFnReturnType>
  >
) {
  return storiesOfFactory("Tile", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: tileArgTypes,
      args: componentArgs<TileArgs>({
        label: "Boom kappen of snoeien",
        imageSource: "images/icon-tree.png",
        imageAlt: "Boom",
      }),
    });

    const template = templateMapper<TileArgs>((args, { tileTemplate }) => tileTemplate(tileArgsMapper(args)));

    stories.add("default", template);

    stories.add("theme", template, {
      args: componentArgs<Pick<TileArgs, "variant">>({
        variant: "theme",
      }),
    });
  });
}
