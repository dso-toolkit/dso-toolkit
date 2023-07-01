import { storiesOfTabs, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import cssReadme from "dso-toolkit/src/components/tabs/readme.md?raw";

import { templateContainer } from "../../templates";

storiesOfTabs({
  parameters: {
    storiesOf,
    module,
    readme: cssReadme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ tabsTemplate }) => ({ tabsTemplate }),
});
