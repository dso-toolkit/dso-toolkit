import { storiesOfOzonContent, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import coreReadme from "@dso-toolkit/core/src/components/ozon-content/readme.md?raw";

import { templateContainer } from "../../templates";

storiesOfOzonContent({
  parameters: {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core,
  },
  templateContainer,
  storyTemplates: ({ ozonContentTemplate }) => ({ ozonContentTemplate }),
});
