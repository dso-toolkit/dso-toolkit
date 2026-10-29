import { Meta, StoryObj } from "@storybook/web-components-vite";

import { tiles } from "./tile-grid.content.js";
import { tileGridTemplate } from "./tile-grid.template.js";

const meta: Meta = {
  title: "HTML|CSS/Tile Grid",
  tags: ["!autodocs"],
};

export default meta;

export const TileGrid: StoryObj = {
  render: () => tileGridTemplate({ tiles: tiles() }),
};
