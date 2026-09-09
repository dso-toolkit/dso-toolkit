import { TemplateResult } from "lit-html";
import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";
import { fn } from "storybook/test";

import { argTypeAction } from "../../shared/arg-type-action.js";

import { Panel } from "./panel.models.js";

export interface PanelArgs {
  dsoCloseClick: HandlerFunction;
  emphasized: boolean;
}

export const panelArgs: PanelArgs = {
  emphasized: false,
  dsoCloseClick: fn(),
};

export const panelArgTypes: ArgTypes<PanelArgs> = {
  dsoCloseClick: argTypeAction(),
  emphasized: {
    control: {
      type: "boolean",
    },
  },
};

export function panelArgsMapper(
  a: PanelArgs,
  children: TemplateResult | string,
  heading: TemplateResult | string,
): Panel {
  return {
    ...a,
    children,
    heading,
    dsoCloseClick: (e) => a.dsoCloseClick(e.detail),
  };
}
