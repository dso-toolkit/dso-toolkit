import { ArgTypes } from "@storybook/types";

import { Panel } from "./panel.models.js";
import { HandlerFunction } from "@storybook/addon-actions";

export interface PanelArgs {
  dsoCloseClick: HandlerFunction;
}

export const panelArgs: Omit<PanelArgs, "dsoCloseClick"> = {};

export const panelArgTypes: ArgTypes<PanelArgs> = {
  dsoCloseClick: {
    action: "dsoCloseClick",
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
  };
}
