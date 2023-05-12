import { storiesOfActionList } from "dso-toolkit";
import { storiesOf } from "@storybook/react";
import { templateContainer } from "../../templates";

import { actionListItems, actionListWithWarningItems } from "./action-list.content";

import readme from "./readme.md";

storiesOfActionList({
  parameters: {
    storiesOf,
    module,
    readme,
  },
  templateContainer,
  storyTemplates: ({ actionListTemplate }, templates) => ({
    actionListTemplate,
    actionListItems: actionListItems(templates),
    actionListWithWarningItems: actionListWithWarningItems(templates),
  }),
});
