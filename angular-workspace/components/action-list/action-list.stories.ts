import { type Meta, moduleMetadata } from "@storybook/angular";

import { ActionListArgs, actionListMeta, actionListStories } from "dso-toolkit";

import { templateContainer } from "../../templates";
import { actionListItems, actionListWithWarningItems } from "./action-list.content";

import readme from "./readme.md?raw";
import { DsoActionList } from "../../projects/component-library/src/public-api";

const meta: Meta<ActionListArgs> = {
  ...actionListMeta({ readme }),
  decorators: [
    moduleMetadata({
      imports: [DsoActionList],
    })
  ],
  title: "Action List",
};

export default meta;

const { Default, WithWarning } = actionListStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { actionListTemplate } = templates;

    return {
      actionListTemplate,
      actionListItems,
      actionListWithWarningItems,
    };
  },
});

export { Default, WithWarning };
