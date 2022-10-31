import { storiesOfInputNumber } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/web-components";

import readme from "@dso-toolkit/css/src/components/input-number/readme.md";
import { StoryRoot } from "@dso-toolkit/sources/src/storybook";
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
