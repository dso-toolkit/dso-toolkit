import { storiesOfProgressIndicator, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import cssReadme from "dso-toolkit/src/components/progress-indicator/readme.md";
import coreReadme from "@dso-toolkit/core/src/components/progress-indicator/readme.md";

import { templateContainer } from "../../templates";

storiesOfProgressIndicator({
  parameters: {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ progressIndicatorTemplate }) => ({ progressIndicatorTemplate }),
});

storiesOfProgressIndicator({
  parameters: {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core,
  },
  templateContainer,
  storyTemplates: ({ progressIndicatorTemplate }) => ({ progressIndicatorTemplate }),
});
