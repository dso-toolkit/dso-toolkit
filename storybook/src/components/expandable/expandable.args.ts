import { TemplateResult } from "lit-html";
import { ArgTypes } from "storybook/internal/types";

import { argTypeAction } from "../../shared/arg-type-action.js";

import { Expandable } from "./expandable.models.js";

export interface ExpandableArgs {
  open: boolean;
  enableAnimation: boolean;
  minimumHeight: number;
}

export const expandableArgTypes: ArgTypes<ExpandableArgs> = {
  open: {
    type: "boolean",
  },
  enableAnimation: {
    type: "boolean",
  },
  minimumHeight: argTypeAction(),
};

export function expandableArgsMapper(a: ExpandableArgs, content: TemplateResult | string): Expandable {
  return {
    ...a,
    content,
  };
}
