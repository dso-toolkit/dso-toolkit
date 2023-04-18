import { ArgTypes } from "../../storybook/index.js";

import { ScrollContainer } from "./scroll-container.models.js";

export interface ScrollContainerArgs {
}

export const scrollContainerArgTypes: ArgTypes<ScrollContainerArgs> = {
};

export function scrollContainerArgsMapper(
  a: ScrollContainerArgs,
): ScrollContainer {
  return {...a}
}
