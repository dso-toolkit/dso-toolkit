import coreReadme from "@dso-toolkit/core/src/components/modal/readme.md";
import cssReadme from "@dso-toolkit/css/src/components/modal/readme.md";
import { storiesOfModal } from "@dso-toolkit/sources";
import { StoryRoot } from "@dso-toolkit/sources/src/storybook";
import { storiesOf } from "@storybook/web-components";

import { templateContainer } from "../../templates";

storiesOfModal({
  parameters: {
    storiesOf,
    module,
    readme: cssReadme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ modalTemplate, progressIndicatorTemplate }) => ({ modalTemplate, progressIndicatorTemplate }),
});

storiesOfModal({
  parameters: {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core,
  },
  templateContainer,
  storyTemplates: ({ modalTemplate, progressIndicatorTemplate }) => ({ modalTemplate, progressIndicatorTemplate }),
});
