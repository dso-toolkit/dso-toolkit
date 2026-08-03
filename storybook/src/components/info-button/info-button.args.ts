import { TemplateResult } from "lit-html";
import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";

import { argTypeAction } from "../../shared/arg-type-action.js";

import { InfoButton, InfoButtonTooltipPlacement } from "./info-button.models.js";

export interface InfoButtonArgs {
  active: boolean;
  toggletipPlacement: InfoButtonTooltipPlacement;
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
  dsoToggle: argTypeAction(),
};

export function infoButtonArgsMapper(a: InfoButtonArgs, children?: TemplateResult): InfoButton<TemplateResult> {
  return { ...a, children };
}
