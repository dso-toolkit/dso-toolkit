import { storiesOfApplicationHeading, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import cssReadme from "dso-toolkit/src/components/application-heading/readme.md";

import { templateContainer } from "../../templates";

storiesOfApplicationHeading({
  parameters: {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ applicationHeadingTemplate }) => ({ applicationHeadingTemplate }),
});
