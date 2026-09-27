import { ArgTypes } from "@storybook/web-components-vite";
import { HandlerFunction } from "storybook/actions";

import { argTypeAction } from "../../shared/arg-type-action.js";

export interface AutosuggestArgs {
  loading: boolean;
  loadingLabel: string;
  loadingDelayed: number;
  notFoundLabel: string;
  dsoSelect: HandlerFunction;
  dsoChange: HandlerFunction;
  dsoSearch: HandlerFunction;
}

export const autosuggestArgTypes: ArgTypes<AutosuggestArgs> = {
  loading: {
    control: {
      type: "boolean",
    },
  },
  loadingLabel: {
    control: {
      type: "text",
    },
  },
  loadingDelayed: {
    control: {
      type: "number",
    },
  },
  notFoundLabel: {
    control: {
      type: "text",
    },
  },
  dsoSelect: argTypeAction(),
  dsoChange: argTypeAction(),
  dsoSearch: argTypeAction(),
};
