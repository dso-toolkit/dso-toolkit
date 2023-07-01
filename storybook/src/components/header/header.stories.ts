import { storiesOfHeader, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import readme from "@dso-toolkit/core/src/components/header/readme.md?raw";

import { templateContainer } from "../../templates";

storiesOfHeader({
  parameters: {
    module,
    storiesOf,
    readme,
    root: StoryRoot.Core,
  },
  templateContainer,
  storyTemplates: ({ headerTemplate }) => ({ headerTemplate }),
});
