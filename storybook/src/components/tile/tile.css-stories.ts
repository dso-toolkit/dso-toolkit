import type { Meta } from "@storybook/web-components";
import { TileArgs, tileMeta, tileStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "dso-toolkit/src/components/tile/readme.md?raw";

const meta: Meta<TileArgs> = {
  ...tileMeta({ readme }),
  title: "HTML|CSS/Tile",
};

export default meta;

const { Default, Theme } = tileStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { tileTemplate } = templates;

    return {
      tileTemplate,
    };
  },
});

export { Default, Theme };