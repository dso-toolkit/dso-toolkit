import { TemplateResult } from "lit-html";
import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";

import { argTypeAction } from "../../shared/arg-type-action.js";

import { Scrollable } from "./scrollable.models.js";

export interface ScrollableArgs {
  dsoScrollEnd: HandlerFunction;
}

export const scrollableArgTypes: ArgTypes<ScrollableArgs> = {
  dsoScrollEnd: argTypeAction(),
};

export function scrollableArgsMapper(a: ScrollableArgs, children: TemplateResult): Scrollable<TemplateResult> {
  return {
    ...a,
    dsoScrollEnd: (e) => a.dsoScrollEnd(e.detail),
    children,
  };
}
