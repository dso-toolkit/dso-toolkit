import type { ArgTypes } from "@storybook/web-components-vite";
import { HandlerFunction } from "storybook/actions";

import { argTypeAction } from "../../shared/arg-type-action.js";

export interface TreeViewArgs {
  dsoClickItem: HandlerFunction;
}

export const treeViewArgTypes: ArgTypes<TreeViewArgs> = {
  dsoClickItem: argTypeAction(),
};
