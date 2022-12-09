import { storiesOfIcon, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import coreReadme from "@dso-toolkit/core/src/components/icon/readme.md";
import cssReadme from "dso-toolkit/src/components/icon/readme.md";

import { templateContainer } from "../../templates";

storiesOfIcon({
  parameters: {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ iconTemplate }) => ({ iconTemplate }),
});

storiesOfIcon({
  parameters: {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core,
  },
  templateContainer,
  storyTemplates: ({ iconTemplate }) => ({ iconTemplate }),
});
