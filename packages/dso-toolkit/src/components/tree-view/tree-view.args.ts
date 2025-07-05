import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";

export interface TreeViewArgs {
  dsoClickItem: HandlerFunction;
}

export const treeViewArgTypes: ArgTypes<TreeViewArgs> = {
  dsoClickItem: {
    action: "dsoClickItem",
  },
};
