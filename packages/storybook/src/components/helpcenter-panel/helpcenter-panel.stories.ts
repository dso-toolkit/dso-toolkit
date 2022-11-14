import { storiesOfHelpcenterPanel } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/web-components";

import coreReadme from "@dso-toolkit/core/src/components/helpcenter-panel/readme.md";

import { StoryRoot } from "@dso-toolkit/sources/src/storybook";
import { templateContainer } from "../../templates";
import { content } from "./helpcenter-panel.content";

storiesOfHelpcenterPanel({
  parameters: {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core,
  },
  templateContainer,
  storyTemplates: ({ helpcenterPanelTemplate }, templates) => ({
    helpcenterPanelTemplate,
    content: content(templates),
  }),
});
