import { ArgTypes } from "storybook/internal/types";

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

export function actionListArgsMapper(a: ActionListArgs, actionListItems: ActionListItem[]): ActionList {
  return { ...a, actionListItems };
}
