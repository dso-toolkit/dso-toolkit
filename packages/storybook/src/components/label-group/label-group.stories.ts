import { storiesOf } from "@storybook/web-components";

import cssReadme from "@dso-toolkit/css/src/components/label-group/readme.md";

import { StoryRoot } from "@dso-toolkit/sources/src/storybook";
import { templateContainer } from "../../templates";
import { storiesOfLabelGroup } from "@dso-toolkit/sources";

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
