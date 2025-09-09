import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";

import { Tooltip, tooltipPlacement, tooltipStrategy } from "./tooltip.models.js";

export interface TooltipArgs {
  active: boolean;
  descriptive?: boolean;
  position: (typeof tooltipPlacement)[number];
  strategy: (typeof tooltipStrategy)[number];
  label: string;
  id: string;
  action: HandlerFunction;
}

export const tooltipArgTypes: ArgTypes<TooltipArgs> = {
  active: {
    control: {
      type: "boolean",
    },
  },
  descriptive: {
    control: {
      type: "boolean",
    },
  },
  position: {
    options: tooltipPlacement,
    control: {
      type: "select",
    },
  },
  strategy: {
    options: tooltipStrategy,
    control: {
      type: "select",
    },
  },
  label: {
    control: {
      type: "text",
    },
  },
  id: {
    control: {
      type: "text",
    },
  },
  action: {
    action: "Button",
  },
};

export function tooltipArgsMapper(a: TooltipArgs): Tooltip {
  return {
    active: a.active,
    descriptive: a.descriptive,
    label: a.label || `Ik sta "${a.position}"`,
    position: a.position,
    strategy: a.strategy,
    id: a.id,
  };
}
