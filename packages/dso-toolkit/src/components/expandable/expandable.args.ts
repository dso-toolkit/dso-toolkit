import { HandlerFunction } from "@storybook/addon-actions";
import { ArgTypes, noControl } from "../../storybook/index.js";
import { Expandable } from "./expandable.models.js";

export interface ExpandableArgs {
  open: boolean;
  enableAnimation: boolean;
  minimumHeight: number;
  dsoToggle: HandlerFunction;
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
  dsoToggle: {
    ...noControl,
    action: "dsoToggle",
  },
};

export function expandableArgsMapper<TemplateFnReturnType>(
  a: ExpandableArgs,
  content: TemplateFnReturnType
): Expandable<TemplateFnReturnType> {
  return {
    ...a,
    content,
    dsoToggle: (e) => a.dsoToggle(e.detail),
  };
}
