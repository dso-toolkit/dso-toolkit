import { ArgTypes } from "@storybook/types";

import { MarkBar } from "./mark-bar.models.js";
import { HandlerFunction } from "@storybook/addon-actions/*";

export interface MarkBarArgs {
  value: string;
  label: string;
  current: number;
  totalCount: number;
  focus: boolean;
  dsoInput: HandlerFunction;
  dsoNext: HandlerFunction;
  dsoPrevious: HandlerFunction;
  dsoClear: HandlerFunction;
}

export const markBarArgs: Omit<MarkBarArgs, "value" | "dsoInput" | "dsoNext" | "dsoPrevious" | "dsoClear"> = {
  label: "Zoeken binnen gehele document, en verder dan dat.",
  current: 1,
  totalCount: 8,
  focus: false,
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
  focus: {
    type: "boolean",
  },
};

export function markBarArgsMapper(a: MarkBarArgs): MarkBar {
  if (a.focus) {
    setTimeout(() => {
      const markBar = document.querySelector<HTMLElement & { dsoFocus: (options: { select: boolean }) => void }>(
        "dso-mark-bar",
      );

      markBar?.dsoFocus({ select: true });
    });
  }

  return {
    ...a,
  };
}
