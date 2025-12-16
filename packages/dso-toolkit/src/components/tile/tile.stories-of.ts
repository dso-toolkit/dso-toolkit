import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { StoriesParameters, StoryObj } from "../../template-container.js";

import { TileArgs, tileArgTypes, tileArgsMapper } from "./tile.args.js";
import { Tile } from "./tile.models.js";

type TileStory = StoryObj<TileArgs, Renderer>;

interface TileStories {
  Default: TileStory;
  Theme: TileStory;
}

interface TileStoriesParameters<Implementation, Templates, TemplateFnReturnType> extends StoriesParameters<
  Implementation,
  Templates,
  TemplateFnReturnType,
  TileTemplates<TemplateFnReturnType>
> {}

interface TileTemplates<TemplateFnReturnType> {
  tileTemplate: (tileProperties: Tile) => TemplateFnReturnType;
}

export function tileMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  TileArgs
> {
  return {
    argTypes: tileArgTypes,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function tileStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: TileStoriesParameters<Implementation, Templates, TemplateFnReturnType>): TileStories {
  return {
    Default: {
      args: {
        label: "Boom kappen of snoeien",
        imageSource: "images/icon-tree.png",
        imageAlt: "",
      },
      render: templateContainer.render(storyTemplates, (args, { tileTemplate }) => tileTemplate(tileArgsMapper(args))),
    },
    Theme: {
      args: {
        label: "Boom kappen of snoeien",
        imageSource: "images/icon-tree.png",
        imageAlt: "",
        variant: "theme",
      },
      render: templateContainer.render(storyTemplates, (args, { tileTemplate }) => tileTemplate(tileArgsMapper(args))),
    },
  };
}
