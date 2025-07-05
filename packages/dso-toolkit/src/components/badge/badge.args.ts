import { ArgTypes } from "storybook/internal/types";

import { Badge, BadgeStatus } from "./badge.models.js";

export interface BadgeArgs {
  status?: BadgeStatus;
  message: string;
}

export const badgeArgTypes: ArgTypes<BadgeArgs> = {
  status: {
    options: [undefined, "primary", "success", "info", "warning", "error", "outline", "attention"],
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
