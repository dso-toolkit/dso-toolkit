import type { Meta } from "@storybook/web-components-vite";
import readme from "dso-toolkit/src/components/tile-grid/readme.md?raw";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import { StoryObj } from "../../shared/story-obj.js";

import { tiles } from "./tile-grid.content.js";
import { tileGridTemplate } from "./tile-grid.template.js";

type TileGridStory = StoryObj<Record<string, never>, Renderer>;

const meta: Meta<Record<string, never>> = {
  title: "HTML|CSS/Tile Grid",
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

export const TileGrid: TileGridStory = {
  render: () => tileGridTemplate({ tiles }),
};
