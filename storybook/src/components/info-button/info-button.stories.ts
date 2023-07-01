import { storiesOfInfoButton, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import cssReadme from "dso-toolkit/src/components/info-button/readme.md?raw";
import coreReadme from "@dso-toolkit/core/src/components/info-button/readme.md?raw";

import { templateContainer } from "../../templates";

storiesOfInfoButton({
  parameters: {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ infoButtonTemplate }) => ({ infoButtonTemplate }),
});

storiesOfInfoButton({
  parameters: {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core,
  },
  templateContainer,
  storyTemplates: ({ infoButtonTemplate }) => ({ infoButtonTemplate }),
});
