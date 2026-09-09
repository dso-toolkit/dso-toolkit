import { ArgTypes } from "storybook/internal/types";

import { CursorTooltip } from "./cursor-tooltip.models.js";

export interface CursorTooltipArgs {
  message: string;
}

export const cursorTooltipArgs: CursorTooltipArgs = {
  message: "Dit is een tooltip die volgt bij de cursor",
};

export const cursorTooltipArgTypes: ArgTypes<CursorTooltipArgs> = {
  message: {
    control: {
      type: "text",
    },
  },
};

export function cursorTooltipArgsMapper(a: CursorTooltipArgs): CursorTooltip {
  return {
    ...a,
  };
}
