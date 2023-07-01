import { storiesOfList, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import cssReadme from "dso-toolkit/src/components/list/readme.md?raw";

import { templateContainer } from "../../templates";

storiesOfList({
  parameters: {
    storiesOf,
    module,
    readme: cssReadme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ listTemplate }) => ({ listTemplate }),
});
