import { storiesOfSearchBar, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import cssReadme from "dso-toolkit/src/components/search-bar/readme.md?raw";

import { templateContainer } from "../../templates";

storiesOfSearchBar({
  parameters: {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ searchBarTemplate }) => ({ searchBarTemplate }),
});
