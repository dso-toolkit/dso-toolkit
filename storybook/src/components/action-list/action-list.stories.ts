import { storiesOfActionList, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import coreReadme from "@dso-toolkit/core/src/components/action-list/readme.md?raw";

import { templateContainer } from "../../templates";
import { actionListItems, actionListWithWarningItems } from "./action-list.content";

storiesOfActionList({
  parameters: {
    storiesOf,
    module,
    readme: coreReadme,
    root: StoryRoot.Core,
  },
  templateContainer,
  storyTemplates: ({ actionListTemplate }, templates) => ({
    actionListTemplate,
    actionListItems: actionListItems(templates),
    actionListWithWarningItems: actionListWithWarningItems(templates),
  }),
});
