import { ArgTypes } from "storybook/internal/types";

import { argTypeAction } from "../../storybook";

import { Badge, BadgeStatus, BadgeTooltipPlacement } from "./badge.models.js";

const BADGE_STATUS_OPTIONS: (BadgeStatus | undefined)[] = [
  undefined,
  "primary",
  "success",
  "info",
  "warning",
  "error",
  "outline",
  "attention",
];

export interface BadgeArgs {
  status?: BadgeStatus;
  message: string;
  label?: string;
  toggletipPlacement: BadgeTooltipPlacement;
  tooltipPlacement: BadgeTooltipPlacement;
  toggletip?: boolean;
}

export const badgeArgTypes: ArgTypes<BadgeArgs> = {
  status: {
    options: BADGE_STATUS_OPTIONS,
    control: {
      type: "select",
    },
  },
  message: {
    control: {
      type: "text",
    },
  },
  label: {
    if: { arg: "toggletip", eq: true },
    control: {
      type: "text",
    },
  },
  toggletipPlacement: {
    if: { arg: "toggletip", eq: true },
    options: ["top", "left", "bottom", "right"],
    control: {
      type: "select",
    },
  },
  tooltipPlacement: {
    if: { arg: "toggletip", eq: true },
    options: ["top", "left", "bottom", "right"],
    control: {
      type: "select",
    },
  },
  toggletip: argTypeAction(),
};

export function badgeArgsMapper<TemplateFnReturnType>(
  a: BadgeArgs,
  children?: TemplateFnReturnType,
): Badge<TemplateFnReturnType> {
  return {
    ...a,
    children,
  };
}
