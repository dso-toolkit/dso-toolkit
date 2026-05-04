import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";
import { fn } from "storybook/test";

import { argTypeAction } from "../../storybook";
import { IconAlias } from "../icon";

import { IconButtonTooltipPlacement, IconButtonVariant } from "./icon-button.models";

export interface IconButtonArgs {
  variant: IconButtonVariant;
  icon: IconAlias;
  label: string;
  tooltipPlacement?: IconButtonTooltipPlacement;
  dsoClick?: HandlerFunction;
  disabled: boolean;
  isToggled?: boolean;
}

export const iconButtonArgs: IconButtonArgs = {
  variant: "secondary",
  icon: "bars",
  label: "Navigation",
  tooltipPlacement: "top",
  isToggled: false,
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
    isToggled: {
      control: {
        type: "boolean",
      },
      description: "Whether the button is toggled/active.",
    },
    dsoClick: argTypeAction(),
  };
}
