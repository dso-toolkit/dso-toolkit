import { ArgTypes } from "@storybook/web-components-vite";
import { TemplateResult } from "lit-html";
import { HandlerFunction } from "storybook/actions";

import { argTypeAction } from "../../shared/arg-type-action.js";

import { Scrollable } from "./scrollable.models.js";

export interface ScrollableArgs {
  dsoScrollEnd: HandlerFunction;
}

export const scrollableArgTypes: ArgTypes<ScrollableArgs> = {
  dsoScrollEnd: argTypeAction(),
};

export function scrollableArgsMapper(a: ScrollableArgs, children: TemplateResult): Scrollable {
  return {
    ...a,
    dsoScrollEnd: (e) => a.dsoScrollEnd(e.detail),
    children,
  };
}
