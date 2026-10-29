import { Meta, StoryObj } from "@storybook/web-components-vite";

import { ActionListArgs, actionListArgTypes, actionListArgs, actionListArgsMapper } from "./action-list.args.js";
import { actionListItems, actionListWithWarningItems } from "./action-list.content.js";
import { actionListTemplate } from "./action-list.template.js";

type ActionListStory = StoryObj<ActionListArgs>;

const meta: Meta<ActionListArgs> = {
  title: "Core/Action List",
  tags: ["!autodocs"],
  argTypes: actionListArgTypes,
  args: actionListArgs,
};

export default meta;

export const Default: ActionListStory = {
  render: (args) => actionListTemplate(actionListArgsMapper(args, actionListItems())),
};

export const WithWarning: ActionListStory = {
  render: (args) => actionListTemplate(actionListArgsMapper(args, actionListWithWarningItems())),
};
