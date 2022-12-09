import { storiesOfFormButtons, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import cssReadme from "dso-toolkit/src/components/form/form-buttons/readme.md";

import { templateContainer } from "../../templates";

storiesOfFormButtons({
  parameters: {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ formButtonsTemplate }) => ({ formButtonsTemplate }),
});
