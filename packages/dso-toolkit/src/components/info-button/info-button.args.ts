import { TooltipPlacement } from "@dso-toolkit/core/src";
import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";

import { argTypeAction } from "../../storybook";

import { InfoButton } from "./info-button.models.js";

export interface InfoButtonArgs {
  active: boolean;
  toggletipPlacement: TooltipPlacement;
  secondary: boolean;
  label: string;
  dsoToggle: HandlerFunction;
}

export const infoButtonArgTypes: ArgTypes<InfoButtonArgs> = {
  label: {
    control: {
      type: "text",
    },
  },
  active: {
    control: {
      type: "boolean",
    },
  },
  toggletipPlacement: {
    options: ["top", "left", "bottom", "right"],
    control: {
      type: "select",
    },
  },
  secondary: {
    control: {
      type: "boolean",
    },
  },
  dsoToggle: argTypeAction(),
};

export function infoButtonArgsMapper<TemplateFnReturnType>(
  a: InfoButtonArgs,
  children?: TemplateFnReturnType,
): InfoButton<TemplateFnReturnType> {
  return { ...a, children };
}
