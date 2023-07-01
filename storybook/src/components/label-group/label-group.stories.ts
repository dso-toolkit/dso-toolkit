import { storiesOf } from "@storybook/web-components";

import cssReadme from "dso-toolkit/src/components/label-group/readme.md?raw";

import { templateContainer } from "../../templates";
import { storiesOfLabelGroup, StoryRoot } from "dso-toolkit";

storiesOfLabelGroup({
  parameters: {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ labelGroupTemplate }) => ({ labelGroupTemplate }),
});
