import type { Meta, StoryObj } from "@storybook/web-components-vite";
import readme from "dso-toolkit/src/components/tile-grid/readme.md?raw";
import { compiler } from "markdown-to-jsx/react";

import { tiles } from "./tile-grid.content.js";
import { tileGridTemplate } from "./tile-grid.template.js";

const meta: Meta = {
  title: "HTML|CSS/Tile Grid",
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

export const TileGrid: StoryObj = {
  render: () => tileGridTemplate({ tiles: tiles() }),
};
