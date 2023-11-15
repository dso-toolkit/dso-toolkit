import { ArgTypes } from "@storybook/types";

import { MarkBar } from "./mark-bar.models.js";
import { HandlerFunction } from "@storybook/addon-actions/*";

export interface MarkBarArgs {
  value: string;
  label?: string;
  current: number;
  totalCount: number;
  dsoInput: HandlerFunction;
  dsoNext: HandlerFunction;
  dsoPrevious: HandlerFunction;
  dsoClear: HandlerFunction;
}

export const markBarArgs: Omit<MarkBarArgs, "value" | "label" | "dsoInput" | "dsoNext" | "dsoPrevious" | "dsoClear"> = {
  current: 1,
  totalCount: 8,
};

export const markBarArgTypes: ArgTypes<MarkBarArgs> = {
  value: {
    type: "string",
  },
  label: {
    type: "string",
  },
  current: {
    type: "number",
  },
  totalCount: {
    type: "number",
  },
  dsoInput: {
    action: "dsoInput",
  },
  dsoNext: {
    action: "dsoNext",
  },
  dsoPrevious: {
    action: "dsoPrevious",
  },
  dsoClear: {
    action: "dsoClear",
  },
};

export function markBarArgsMapper(a: MarkBarArgs): MarkBar {
  return {
    ...a,
  };
}
