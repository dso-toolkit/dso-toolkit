import { storiesOfHelpcenterPanel, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import coreReadme from "@dso-toolkit/core/src/components/helpcenter-panel/readme.md?raw";

import { templateContainer } from "../../templates";

storiesOfHelpcenterPanel({
  parameters: {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core,
  },
  templateContainer,
  storyTemplates: ({ helpcenterPanelTemplate }) => ({
    helpcenterPanelTemplate,
  }),
});
