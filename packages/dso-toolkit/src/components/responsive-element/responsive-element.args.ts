import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";

export interface ResponsiveElementArgs {
  dsoSizeChange: HandlerFunction;
}

export const responsiveElementArgTypes: ArgTypes<ResponsiveElementArgs> = {
  dsoSizeChange: {
    action: "dsoSizeChange",
  },
};
