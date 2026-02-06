import { ArgTypes } from "storybook/internal/types";

import { Badge, BadgeStatus } from "./badge.models.js";

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
};

export function badgeArgsMapper(a: BadgeArgs): Badge {
  return {
    status: a.status,
    message: a.message,
  };
}
