import { HandlerFunction } from "@storybook/addon-actions";
import { ArgTypes } from "@storybook/types";

import { Scrollable } from "./scrollable.models.js";

export interface ScrollableArgs {
  dsoScrollEnd: HandlerFunction;
}

export const scrollableArgTypes: ArgTypes<ScrollableArgs> = {
  dsoScrollEnd: {
    action: "dsoScrollEnd",
  },
};

export function scrollableArgsMapper<TemplateFnReturnType>(
  a: ScrollableArgs,
  children: TemplateFnReturnType
): Scrollable<TemplateFnReturnType> {
  return { ...a, children };
}
