import { storiesOfTileGrid } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/web-components";
import { html } from "lit-html";

import readme from "@dso-toolkit/css/src/components/tile-grid/readme.md";
import { StoryRoot } from "@dso-toolkit/sources/src/storybook";
import { templateContainer } from "../../templates";

storiesOfTileGrid({
  parameters: {
    module,
    storiesOf,
    readme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ tileGridTemplate, tileTemplate }) => ({
    tileGridDemoTemplate: (children) =>
      tileGridTemplate({
        children: html`${children.map((c) => tileTemplate(c))}`,
      }),
  }),
});
