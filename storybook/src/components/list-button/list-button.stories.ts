import { storiesOfListButton, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import cssReadme from "dso-toolkit/src/components/list-button/readme.md";

import { templateContainer } from "../../templates";

storiesOfListButton({
  parameters: {
    storiesOf,
    module,
    readme: cssReadme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ listButtonTemplate }) => ({ listButtonTemplate }),
});
