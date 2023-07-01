import { ArgTypes } from "@storybook/types";

import { Toggletip } from "./toggletip.models.js";
import { tooltipPositions } from "../tooltip/tooltip.models.js";

export interface ToggletipArgs {
  position: "top" | "right" | "bottom" | "left";
  small?: boolean;
  label?: string;
  secondary?: boolean;
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
  secondary: {
    control: {
      type: "boolean",
    },
  },
};

export function toggletipArgsMapper<TemplateFnReturnType>(
  a: ToggletipArgs,
  children: TemplateFnReturnType
): Toggletip<TemplateFnReturnType> {
  return {
    children,
    position: a.position,
    small: a.small,
    label: a.label,
    secondary: a.secondary,
  };
}
