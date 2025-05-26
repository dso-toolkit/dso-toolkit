import { HandlerFunction } from "@storybook/addon-actions";
import { ArgTypes } from "@storybook/types";

import { Panel } from "./panel.models.js";

export interface PanelArgs {
  dsoCloseClick: HandlerFunction;
  emphasized: boolean;
}

export const panelArgs: Omit<PanelArgs, "dsoCloseClick"> = {
  emphasized: false,
};

export const panelArgTypes: ArgTypes<PanelArgs> = {
  dsoCloseClick: {
    action: "dsoCloseClick",
  },
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
  };
}
