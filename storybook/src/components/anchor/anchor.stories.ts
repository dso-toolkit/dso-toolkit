import { storiesOfAnchor, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import cssReadme from "dso-toolkit/src/components/anchor/readme.md";

import { templateContainer } from "../../templates";

storiesOfAnchor({
  parameters: {
    storiesOf,
    module,
    readme: cssReadme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ anchorTemplate }) => ({ anchorTemplate }),
});
