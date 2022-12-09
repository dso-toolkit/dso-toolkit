import { storiesOfButton, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import readme from "dso-toolkit/src/components/button/readme.md";
import { templateContainer } from "../../templates";

storiesOfButton({
  parameters: {
    storiesOf,
    module,
    readme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ buttonTemplate }) => ({ buttonTemplate }),
});
