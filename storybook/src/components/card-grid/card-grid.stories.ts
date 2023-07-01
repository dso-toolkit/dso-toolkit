import { storiesOfCardGrid, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import { cards } from "./card-grid.content";
import cssReadme from "dso-toolkit/src/components/card-grid/readme.md?raw";

import { templateContainer } from "../../templates";

storiesOfCardGrid({
  parameters: {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ cardGridTemplate }) => ({ cardGridTemplate, cards }),
});
