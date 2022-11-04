import { storiesOfBadge } from "@dso-toolkit/sources/src";
import { storiesOf } from "@storybook/web-components";

import cssReadme from "@dso-toolkit/css/src/components/badge/readme.md";
import coreReadme from "@dso-toolkit/core/src/components/badge/readme.md";

import { StoryRoot } from "@dso-toolkit/sources/src/storybook";
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
