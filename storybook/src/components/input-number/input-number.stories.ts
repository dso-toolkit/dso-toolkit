import { storiesOfInputNumber, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import readme from "dso-toolkit/src/components/input-number/readme.md?raw";

import { templateContainer } from "../../templates";

storiesOfInputNumber({
  parameters: {
    storiesOf,
    module,
    readme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ inputNumberTemplate }) => ({ inputNumberTemplate }),
});
