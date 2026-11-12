import { ArgTypes } from "@storybook/web-components-vite";
import { HandlerFunction } from "storybook/actions";

import { argTypeAction } from "../../shared/arg-type-action.js";

import { GridColumn } from "./grid-column.models.js";

export interface GridColumnArgs {
  columns: string;
  overlay: boolean;
  dsoClose: HandlerFunction;
}

export const gridColumnArgTypes: ArgTypes<GridColumnArgs> = {
  columns: {
    control: {
      type: "text",
    },
  },
  overlay: {
    control: {
      type: "boolean",
    },
  },
  dsoClose: argTypeAction(),
};

export function gridColumnArgsMapper(a: GridColumnArgs, content: GridColumn["content"]): GridColumn {
  return {
    ...a,
    dsoClose: (e) => a.dsoClose(e.detail),
    content,
  };
}
