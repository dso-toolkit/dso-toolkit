import { ArgTypes } from "@storybook/web-components-vite";
import { HandlerFunction } from "storybook/actions";

import { argTypeAction } from "../../shared/arg-type-action.js";

export interface ResponsiveElementArgs {
  dsoSizeChange: HandlerFunction;
}

export const responsiveElementArgTypes: ArgTypes<ResponsiveElementArgs> = {
  dsoSizeChange: argTypeAction(),
};
