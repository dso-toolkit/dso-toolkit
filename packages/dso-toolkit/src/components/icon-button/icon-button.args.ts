import { TooltipPlacement } from "@dso-toolkit/core/src";
import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";
import { fn } from "storybook/test";

import { argTypeAction } from "../../storybook";

import { IconButtonVariant } from "./icon-button.models";

export interface IconButtonArgs {
  variant: IconButtonVariant;
  icon: string;
  accessibleLabel: string;
  tooltipPlacement: TooltipPlacement;
  dsoIconButtonClick: HandlerFunction;
}

export const iconButtonArgs: IconButtonArgs = {
  variant: "secondary",
  icon: "bars",
  accessibleLabel: "Navigation",
  tooltipPlacement: "top",
  dsoIconButtonClick: fn(),
};

export function iconButtonArgTypes(icons: string[]): ArgTypes<IconButtonArgs> {
  return {
    variant: {
      options: ["secondary", "tertiary", "tertiary-on-color", "map"],
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
    dsoIconButtonClick: argTypeAction(),
  };
}
