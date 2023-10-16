import { storiesOfLogo, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import coreReadme from "@dso-toolkit/core/src/components/logo/readme.md?raw";

import { templateContainer } from "../../templates";

storiesOfLogo({
  parameters: {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core,
  },
  templateContainer,
  storyTemplates: ({ logoTemplate }) => ({ logoTemplate }),
});
