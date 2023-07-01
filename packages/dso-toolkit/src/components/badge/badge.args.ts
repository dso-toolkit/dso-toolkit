import { ArgTypes } from "@storybook/types";

import { Badge } from "./badge.models.js";

export interface BadgeArgs {
  status?: "primary" | "success" | "info" | "warning" | "danger" | "error" | "outline" | "attention";
  message: string;
}

export const badgeArgTypes: ArgTypes<BadgeArgs> = {
  status: {
    options: [undefined, "primary", "success", "info", "warning", "danger", "error", "outline", "attention"],
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
