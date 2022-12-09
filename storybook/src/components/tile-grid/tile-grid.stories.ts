import { storiesOfTileGrid, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import readme from "dso-toolkit/src/components/tile-grid/readme.md";

import { templateContainer } from "../../templates";

storiesOfTileGrid({
  parameters: {
    module,
    storiesOf,
    readme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ tileGridTemplate }) => ({
    tileGridTemplate,
  }),
});
