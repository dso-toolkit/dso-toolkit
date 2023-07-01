import { storiesOf } from "@storybook/angular";

import { storiesOfActionList } from "dso-toolkit";
import { templateContainer } from "../../templates";
import { actionListItems, actionListWithWarningItems } from "./action-list.content";

import readme from "./readme.md?raw";

storiesOfActionList({
  parameters: {
    storiesOf,
    module,
    readme,
  },
  templateContainer,
  storyTemplates: ({ actionListTemplate }) => ({
    actionListTemplate,
    actionListItems,
    actionListWithWarningItems,
  }),
});
