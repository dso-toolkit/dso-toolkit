import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";

import { noControl } from "../../storybook";

export interface TreeViewArgs {
  dsoClickItem: HandlerFunction;
}

export const treeViewArgTypes: ArgTypes<TreeViewArgs> = {
  dsoClickItem: {
    ...noControl,
  },
};
