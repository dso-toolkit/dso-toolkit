import { templateContainer } from "../../templates";
import { Meta } from "@storybook/web-components";
import readme from "dso-toolkit/src/components/tile-grid/readme.md?raw";
import { tileGridMeta, tileGridStories } from "dso-toolkit";
import { tiles } from "./tile-grid.content";

const meta: Meta = {
  ...tileGridMeta({ readme }),
  title: "HTML|CSS/Tile Grid",
};

export default meta;

const { TileGrid } = tileGridStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { tileGridTemplate } = templates;

    return {
      tileGridTemplate,
      tiles,
    };
  },
});

export { TileGrid };
