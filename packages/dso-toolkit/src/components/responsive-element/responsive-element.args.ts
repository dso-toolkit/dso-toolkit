import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";

import { argTypeAction } from "../../storybook";

export interface ResponsiveElementArgs {
  dsoSizeChange: HandlerFunction;
}

export const responsiveElementArgTypes: ArgTypes<ResponsiveElementArgs> = {
  dsoSizeChange: argTypeAction(),
};
