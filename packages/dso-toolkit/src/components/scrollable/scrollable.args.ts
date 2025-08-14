import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";

import { argTypeAction } from "../../storybook";

import { Scrollable } from "./scrollable.models.js";

export interface ScrollableArgs {
  dsoScrollEnd: HandlerFunction;
}

export const scrollableArgTypes: ArgTypes<ScrollableArgs> = {
  dsoScrollEnd: argTypeAction(),
};

export function scrollableArgsMapper<TemplateFnReturnType>(
  a: ScrollableArgs,
  children: TemplateFnReturnType,
): Scrollable<TemplateFnReturnType> {
  return {
    ...a,
    dsoScrollEnd: (e) => a.dsoScrollEnd(e.detail),
    children,
  };
}
