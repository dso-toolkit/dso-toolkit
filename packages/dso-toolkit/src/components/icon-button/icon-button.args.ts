import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";
import { fn } from "storybook/test";

import { argTypeAction } from "../../storybook";

import { IconButtonTooltipPlacement, IconButtonVariant } from "./icon-button.models";

export interface IconButtonArgs {
  variant: IconButtonVariant;
  icon: string;
  label: string;
  tooltipPlacement?: IconButtonTooltipPlacement;
  dsoClick?: HandlerFunction;
  disabled: boolean;
}

export const iconButtonArgs: IconButtonArgs = {
  variant: "secondary",
  icon: "bars",
  label: "Navigation",
  tooltipPlacement: "top",
  dsoClick: fn(),
  disabled: false,
};

export function iconButtonArgTypes(icons: string[]): ArgTypes<IconButtonArgs> {
  return {
    variant: {
      options: ["secondary", "tertiary", "map"],
      control: {
        type: "select",
      },
    },
    icon: {
      options: icons,
      control: {
        type: "select",
      },
    },
    tooltipPlacement: {
      options: ["top", "right", "bottom", "left"],
      control: {
        type: "select",
      },
    },
    label: {
      control: {
        type: "text",
      },
    },
    disabled: {
      control: {
        type: "boolean",
      },
    },
    dsoClick: argTypeAction(),
  };
}
