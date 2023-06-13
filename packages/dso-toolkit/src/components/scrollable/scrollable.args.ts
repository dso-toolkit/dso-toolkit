import { HandlerFunction } from "@storybook/addon-actions";
import { ArgTypes } from "../../storybook/index.js";

import { Scrollable } from "./scrollable.models.js";

export interface ScrollableArgs {
  dsoScrollableEvent: HandlerFunction;
}

export const scrollableArgTypes: ArgTypes<ScrollableArgs> = {
  dsoScrollableEvent: {
    action: "dsoScrollableEvent",
  },
};

export function scrollableArgsMapper<TemplateFnReturnType>(
  a: ScrollableArgs,
  children: TemplateFnReturnType
): Scrollable<TemplateFnReturnType> {
  return { ...a, children };
}
