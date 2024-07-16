import { ArgTypes } from "@storybook/types";

import { Panel } from "./panel.models.js";

export interface PanelArgs {}

export const panelArgs: PanelArgs = {};

export const panelArgTypes: ArgTypes<PanelArgs> = {};

export function panelArgsMapper(a: PanelArgs): Panel {
  return {
    ...a,
  };
}
