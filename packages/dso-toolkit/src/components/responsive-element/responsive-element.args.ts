import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";

import { noControl } from "../../storybook";

export interface ResponsiveElementArgs {
  dsoSizeChange: HandlerFunction;
}

export const responsiveElementArgTypes: ArgTypes<ResponsiveElementArgs> = {
  dsoSizeChange: {
    ...noControl,
  },
};
