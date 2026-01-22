import { ArgTypes } from "storybook/internal/types";

import { CursorTooltip } from "./cursor-tooltip.models.js";

export interface CursorTooltipArgs {
}

export const cursorTooltipArgs: CursorTooltipArgs = {
};

export const cursorTooltipArgTypes: ArgTypes<CursorTooltipArgs> = {
};

export function cursorTooltipArgsMapper(a: CursorTooltipArgs): CursorTooltip {
  return {
    ...a
  };
}
