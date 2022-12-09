import { storiesOfTile, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import cssReadme from "dso-toolkit/src/components/tile/readme.md";

import { templateContainer } from "../../templates";

storiesOfTile({
  parameters: {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ tileTemplate }) => ({ tileTemplate }),
});
