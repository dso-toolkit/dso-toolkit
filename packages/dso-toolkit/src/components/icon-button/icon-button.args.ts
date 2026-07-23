import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";
import { fn } from "storybook/test";

import { argTypeAction } from "../../storybook";
import { IconAlias } from "../icon";

import { IconButtonTooltipPlacement, IconButtonVariant } from "./icon-button.models";

export interface IconButtonArgs {
  expanded?: boolean;
  variant: IconButtonVariant;
  icon: IconAlias;
  label: string;
  tooltipPlacement?: IconButtonTooltipPlacement;
  dsoClick?: HandlerFunction;
  disabled: boolean;
  toggled?: boolean;
}

export const iconButtonArgs: IconButtonArgs = {
  expanded: false,
  variant: "secondary",
  icon: "bars",
  label: "Navigation",
  tooltipPlacement: "top",
  toggled: false,
  dsoClick: fn(),
  disabled: false,
};

export function iconButtonArgTypes(icons: string[]): ArgTypes<IconButtonArgs> {
  return {
    expanded: {
      control: {
        type: "boolean",
      },
    },
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
    toggled: {
      control: {
        type: "boolean",
      },
    },
    dsoClick: argTypeAction(),
  };
}
