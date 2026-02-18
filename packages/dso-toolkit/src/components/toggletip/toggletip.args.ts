import { ArgTypes } from "storybook/internal/types";

import { tooltipPositions } from "../tooltip/tooltip.models.js";

import { Toggletip } from "./toggletip.models.js";

export interface ToggletipArgs {
  position: "top" | "right" | "bottom" | "left";
  small?: boolean;
  label?: string;
}

export const toggletipArgTypes: ArgTypes<ToggletipArgs> = {
  position: {
    options: tooltipPositions,
    control: {
      type: "select",
    },
  },
  small: {
    control: {
      type: "boolean",
    },
  },
  label: {
    control: {
      type: "text",
    },
  },
};

export function toggletipArgsMapper<TemplateFnReturnType>(
  a: ToggletipArgs,
  children: TemplateFnReturnType,
): Toggletip<TemplateFnReturnType> {
  return {
    children,
    position: a.position,
    small: a.small,
    label: a.label,
  };
}
