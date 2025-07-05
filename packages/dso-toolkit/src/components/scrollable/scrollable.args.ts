import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";

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
  children: TemplateFnReturnType,
): Scrollable<TemplateFnReturnType> {
  return { ...a, children };
}
