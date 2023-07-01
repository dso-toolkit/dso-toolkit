import { HandlerFunction } from "@storybook/addon-actions";
import { ArgTypes } from "@storybook/types";

export interface TreeViewArgs {
  dsoClickItem: HandlerFunction;
}

export const treeViewArgTypes: ArgTypes<TreeViewArgs> = {
  dsoClickItem: {
    action: "dsoClickItem",
  },
};
