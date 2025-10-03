import { ArgTypes } from "storybook/internal/types";

import { BadgeStatus } from "../badge";
import { tooltipPositions } from "../tooltip";

import { Toggletip, ToggletipVariant } from "./toggletip.models.js";

export interface ToggletipArgs {
  variant?: ToggletipVariant;
  label?: string;
  placement: "top" | "right" | "bottom" | "left";
  badgeStatus?: BadgeStatus;
  badgeMessage?: string;
}

export const toggletipArgTypes: ArgTypes<ToggletipArgs> = {
  variant: {
    options: ["information", "badge"],
    control: {
      type: "select",
    },
  },
  label: {
    control: {
      type: "text",
    },
  },
  placement: {
    options: tooltipPositions,
    control: {
      type: "select",
    },
  },
  badgeStatus: {
    options: [undefined, "attention", "error", "info", "outline", "primary", "success", "warning"],
    control: {
      type: "select",
    },
    if: { arg: "variant", eq: "badge" },
  },
  badgeMessage: {
    control: {
      type: "text",
    },
    if: { arg: "variant", eq: "badge" },
  },
};

export function toggletipArgsMapper<TemplateFnReturnType>(
  a: ToggletipArgs,
  children: TemplateFnReturnType,
): Toggletip<TemplateFnReturnType> {
  return {
    children,
    variant: a.variant,
    label: a.label,
    placement: a.placement,
    badgeStatus: a.badgeStatus,
    badgeMessage: a.badgeMessage,
  };
}
