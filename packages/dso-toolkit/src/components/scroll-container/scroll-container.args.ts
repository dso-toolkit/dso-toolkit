import { HandlerFunction } from "@storybook/addon-actions";
import { ArgTypes } from "../../storybook/index.js";

import { ScrollContainer } from "./scroll-container.models.js";

export interface ScrollContainerArgs {
  dsoScrollContainerEvent: HandlerFunction;
}

export const scrollContainerArgTypes: ArgTypes<ScrollContainerArgs> = {
  dsoScrollContainerEvent: {
    action: "scrollEnd",
  },
};

export function scrollContainerArgsMapper<TemplateFnReturnType>(
  a: ScrollContainerArgs,
  children: TemplateFnReturnType
): ScrollContainer<TemplateFnReturnType> {
  return { ...a, children };
}
