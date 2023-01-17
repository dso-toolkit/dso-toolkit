import coreReadme from "@dso-toolkit/core/src/components/slide-toggle/readme.md";
import { storiesOf } from "@storybook/web-components";
import { storiesOfSlideToggle, StoryRoot } from "dso-toolkit";

import { templateContainer } from "../../templates";

storiesOfSlideToggle({
  parameters: {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core,
  },
  templateContainer,
  storyTemplates: ({ slideToggleTemplate }) => ({
    slideToggleTemplate,
  }),
});
