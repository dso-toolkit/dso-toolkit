import { storiesOfProgressBar } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/web-components";

import cssReadme from "@dso-toolkit/css/src/components/progress-bar/readme.md";
import coreReadme from "@dso-toolkit/core/src/components/progress-bar/readme.md";

import { StoryRoot } from "@dso-toolkit/sources/src/storybook";
import { templateContainer } from "../../templates";

storiesOfProgressBar({
  parameters: {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ progressBarTemplate }) => ({ progressBarTemplate }),
});

storiesOfProgressBar({
  parameters: {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core,
  },
  templateContainer,
  storyTemplates: ({ progressBarTemplate }) => ({ progressBarTemplate }),
});
