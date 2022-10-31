import { HandlerFunction } from "@storybook/addon-actions";

import { ArgTypes } from "../../storybook";

export interface ResponsiveElementArgs {
  dsoSizeChange: HandlerFunction;
}

export const responsiveElementArgTypes: ArgTypes<ResponsiveElementArgs> = {
  dsoSizeChange: {
    action: "dsoSizeChange",
  },
};
