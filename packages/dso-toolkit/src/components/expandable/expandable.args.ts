import { ArgTypes } from "storybook/internal/types";

import { noControl } from "../../storybook/index.js";

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
  minimumHeight: {
    ...noControl,
  },
};

export function expandableArgsMapper<TemplateFnReturnType>(
  a: ExpandableArgs,
  content: TemplateFnReturnType,
): Expandable<TemplateFnReturnType> {
  return {
    ...a,
    content,
  };
}
