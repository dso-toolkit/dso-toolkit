import { storiesOfProgressBar, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import cssReadme from "dso-toolkit/src/components/progress-bar/readme.md?raw";
import coreReadme from "@dso-toolkit/core/src/components/progress-bar/readme.md?raw";

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
