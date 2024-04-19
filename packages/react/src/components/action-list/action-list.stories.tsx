import { type Meta } from "@storybook/react";
import { ActionListArgs, actionListMeta, actionListStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";
import { actionListItems, actionListWithWarningItems } from "./action-list.content";

const meta: Meta<ActionListArgs> = {
  ...actionListMeta({ readme }),
  title: "Action List",
};

export default meta;

const { Default, WithWarning } = actionListStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { actionListTemplate } = templates;

    return {
      actionListTemplate,
      actionListItems: actionListItems(templates),
      actionListWithWarningItems: actionListWithWarningItems(templates),
    };
  },
});

export { Default, WithWarning };
