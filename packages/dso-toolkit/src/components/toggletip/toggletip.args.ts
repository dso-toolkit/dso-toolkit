import { ArgTypes } from "storybook/internal/types";

import { BadgeStatus, badgeArgTypes } from "../badge";
import { iconArgTypes } from "../icon";

import { Toggletip, TooltipPosition } from "./toggletip.models.js";

export interface ToggletipArgs {
  mode?: "toggle" | "secondary" | "badge" | "icon";
  position?: TooltipPosition;
  small?: boolean;
  label?: string;
  badgeStatus?: BadgeStatus;
  icon?: string;
  iconActive?: string;
}

export const toggletipArgTypes: ArgTypes<ToggletipArgs> = {
  mode: {
    options: ["toggle", "secondary", "badge", "icon"],
    control: {
      type: "select",
    },
    defaultValue: "toggle",
  },
  position: {
    options: ["top", "right", "bottom", "left"],
    control: {
      type: "select",
    },
    defaultValue: "right",
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
  badgeStatus: {
    ...badgeArgTypes.status,
    if: {
      arg: "mode",
      eq: "badge",
    },
  },
  icon: {
    ...iconArgTypes.icon,
    if: {
      arg: "mode",
      eq: "icon",
    },
  },
  iconActive: {
    ...iconArgTypes.icon,
    if: {
      arg: "mode",
      eq: "icon",
    },
  },
};

export function toggletipArgsMapper<TemplateFnReturnType>(
  a: ToggletipArgs,
  children: TemplateFnReturnType,
): Toggletip<TemplateFnReturnType> {
  return {
    children,
    mode: a.mode,
    position: a.position,
    small: a.small,
    label: a.label,
    badgeStatus: a.badgeStatus,
    icon: a.icon,
    iconActive: a.iconActive,
  };
}
