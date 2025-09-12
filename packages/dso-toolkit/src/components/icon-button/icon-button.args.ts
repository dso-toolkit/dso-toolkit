import { Placement } from "@floating-ui/dom";
import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";
import { fn } from "storybook/test";

import { argTypeAction } from "../../storybook";

import { IconButtonVariant } from "./icon-button.models";

export interface IconButtonArgs {
  variant: IconButtonVariant;
  icon: string;
  accessibleLabel: string;
  tooltipPlacement: Placement;
  dsoIconButtonClick: HandlerFunction;
  disabled: boolean;
}

export const iconButtonArgs: IconButtonArgs = {
  variant: "secondary",
  icon: "bars",
  accessibleLabel: "Navigation",
  tooltipPlacement: "top",
  dsoIconButtonClick: fn(),
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
    accessibleLabel: {
      control: {
        type: "text",
      },
    },
    disabled: {
      control: {
        type: "boolean",
      },
    },
    dsoIconButtonClick: argTypeAction(),
  };
}
