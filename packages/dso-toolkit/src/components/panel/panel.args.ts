import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";
import { fn } from "storybook/test";

import { argTypeAction } from "../../storybook";

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

export function panelArgsMapper<TemplateFnReturnType>(
  a: PanelArgs,
  children: TemplateFnReturnType,
  heading: TemplateFnReturnType,
): Panel<TemplateFnReturnType> {
  return {
    ...a,
    children,
    heading,
    dsoCloseClick: (e) => a.dsoCloseClick(e.detail),
  };
}
