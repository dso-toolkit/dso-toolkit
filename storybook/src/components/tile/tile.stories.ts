import type { Meta } from "@storybook/web-components-vite";
import readme from "dso-toolkit/src/components/tile/readme.md?raw";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import { StoryObj } from "../../shared/story-obj.js";

import { TileArgs, tileArgTypes, tileArgsMapper } from "./tile.args.js";
import { tileTemplate } from "./tile.template.js";

type TileStory = StoryObj<TileArgs, Renderer>;

const meta: Meta<TileArgs> = {
  title: "HTML|CSS/Tile",
  argTypes: tileArgTypes,
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

const render = (args: TileArgs) => tileTemplate(tileArgsMapper(args));

export const Default: TileStory = {
  args: {
    label: "Boom kappen of snoeien",
    imageSource: "images/icon-tree.png",
    imageAlt: "",
  },
  render,
};

export const Theme: TileStory = {
  args: {
    label: "Boom kappen of snoeien",
    imageSource: "images/icon-tree.png",
    imageAlt: "",
    variant: "theme",
  },
  render,
};
