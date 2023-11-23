import { StoriesOfArguments, storiesOfFactory, componentArgs } from "../../storybook/index.js";

import { TileArgs, tileArgsMapper, tileArgTypes } from "./tile.args.js";
import { Tile } from "./tile.models.js";

export interface TileTemplates<TemplateFnReturnType> {
  tileTemplate: (tileProperties: Tile) => TemplateFnReturnType;
}

export function storiesOfTile<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    TileTemplates<TemplateFnReturnType>
  >,
) {
  return storiesOfFactory("Tile", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: tileArgTypes,
      args: componentArgs<TileArgs>({
        label: "Boom kappen of snoeien",
        imageSource: "images/icon-tree.png",
        imageAlt: "",
      }),
    });

    const template = templateMapper<TileArgs>((args, { tileTemplate }) => tileTemplate(tileArgsMapper(args)));

    stories.add("default", template);

    stories.add("theme", template, {
      args: componentArgs<Pick<TileArgs, "variant">>({
        variant: "theme",
      }),
    });

    return stories;
  });
}
