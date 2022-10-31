import { storiesOfListButton } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/web-components";

import cssReadme from "@dso-toolkit/css/src/components/list-button/readme.md";

import { StoryRoot } from "@dso-toolkit/sources/src/storybook";
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
