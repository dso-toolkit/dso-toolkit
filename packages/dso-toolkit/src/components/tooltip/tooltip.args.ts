import { HandlerFunction } from "@storybook/addon-actions";

import { ArgTypes } from "@storybook/types";

import { noControl } from "../../storybook";

import { Tooltip, tooltipPositions, tooltipStrategy } from "./tooltip.models.js";

export interface TooltipArgs {
  active: boolean;
  descriptive?: boolean;
  position: (typeof tooltipPositions)[number];
  strategy: (typeof tooltipStrategy)[number];
  label: string;
  id: string;
  action: HandlerFunction;
  variant?: "onboarding";
  dsoClose: HandlerFunction;
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
    options: tooltipPositions,
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
  variant: {
    ...noControl,
  },
  dsoClose: {
    ...noControl,
    action: "dsoClose",
  },
};

export function tooltipArgsMapper<TemplateFnReturnType>(
  a: TooltipArgs,
  heading?: TemplateFnReturnType,
  content?: TemplateFnReturnType,
): Tooltip<TemplateFnReturnType> {
  return {
    active: a.active,
    descriptive: a.descriptive,
    label: !a.variant ? a.label || `Ik sta "${a.position}"` : undefined,
    position: a.position,
    strategy: a.strategy,
    id: a.id,
    variant: a.variant,
    dsoClose: a.dsoClose,
    content,
    heading,
  };
}
