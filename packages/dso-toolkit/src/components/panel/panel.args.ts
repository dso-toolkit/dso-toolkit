import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";

import { noControl } from "../../storybook";

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
    ...noControl,
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
    dsoCloseClick: () => a.dsoCloseClick(),
  };
}
