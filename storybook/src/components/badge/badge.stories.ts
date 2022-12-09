import { storiesOfBadge, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import cssReadme from "dso-toolkit/src/components/badge/readme.md";
import coreReadme from "@dso-toolkit/core/src/components/badge/readme.md";

import { templateContainer } from "../../templates";

storiesOfBadge({
  parameters: {
    storiesOf,
    module,
    readme: cssReadme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ badgeTemplate }) => ({ badgeTemplate }),
});

storiesOfBadge({
  parameters: {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core,
  },
  templateContainer,
  storyTemplates: ({ badgeTemplate }) => ({ badgeTemplate }),
});
