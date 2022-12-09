import { storiesOfButtonRow, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import cssReadme from "dso-toolkit/src/components/button-row/readme.md";

import { templateContainer } from "../../templates";

storiesOfButtonRow({
  parameters: {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ buttonRowTemplate }) => ({ buttonRowTemplate }),
});
