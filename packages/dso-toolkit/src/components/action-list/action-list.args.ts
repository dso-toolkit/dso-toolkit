import { ArgTypes } from "@storybook/types";

import { ActionList, ActionListItem } from "./action-list.models.js";

export interface ActionListArgs {
  title: string;
}

export const actionListArgs: ActionListArgs = {
  title: "Action List",
};

export const actionListArgTypes: ArgTypes<ActionListArgs> = {
  title: {
    type: "string",
  },
};

export function actionListArgsMapper<TemplateFnReturnType>(
  a: ActionListArgs,
  actionListItems: ActionListItem<TemplateFnReturnType>[],
): ActionList<TemplateFnReturnType> {
  return { ...a, actionListItems };
}
