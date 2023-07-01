import { storiesOfWhitebox, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import readme from "dso-toolkit/src/components/whitebox/readme.md?raw";

import { templateContainer } from "../../templates";

storiesOfWhitebox({
  parameters: {
    module,
    storiesOf,
    readme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ whiteboxTemplate }) => ({ whiteboxTemplate }),
});
