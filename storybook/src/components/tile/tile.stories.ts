import { Meta, StoryObj } from "@storybook/web-components-vite";
import readme from "dso-toolkit/src/components/tile/readme.md?raw";
import { compiler } from "markdown-to-jsx/react";

import { TileArgs, tileArgTypes, tileArgsMapper } from "./tile.args.js";
import { tileTemplate } from "./tile.template.js";

type TileStory = StoryObj<TileArgs>;

const meta: Meta<TileArgs> = {
  title: "HTML|CSS/Tile",
  argTypes: tileArgTypes,
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
  render: (args) => tileTemplate(tileArgsMapper(args)),
};

export default meta;

export const Default: TileStory = {
  args: {
    label: "Boom kappen of snoeien",
    imageSource: "images/icon-tree.png",
    imageAlt: "",
  },
};

export const Theme: TileStory = {
  args: {
    label: "Boom kappen of snoeien",
    imageSource: "images/icon-tree.png",
    imageAlt: "",
    variant: "theme",
  },
};
