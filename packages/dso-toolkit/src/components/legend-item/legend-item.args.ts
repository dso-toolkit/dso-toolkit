import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";
import { fn } from "storybook/test";

import { argTypeAction } from "../../storybook";

import { LegendItem } from "./legend-item.models.js";

export interface LegendItemArgs {
  disabled: boolean;
  disabledMessage: string;
  dsoMouseEnter: HandlerFunction;
  dsoMouseLeave: HandlerFunction;
  dsoActiveChange: HandlerFunction;
  active: boolean;
  activatable: boolean;
  label: string;
}

export const legendItemArgs: LegendItemArgs = {
  disabled: false,
  disabledMessage: "",
  active: true,
  activatable: true,
  label: "Legenda item label",
  dsoActiveChange: fn(),
  dsoMouseEnter: fn(),
  dsoMouseLeave: fn(),
};

export const legendItemArgTypes: ArgTypes<LegendItemArgs> = {
  disabled: {
    control: {
      type: "boolean",
    },
  },
  disabledMessage: {
    control: {
      type: "text",
    },
  },
  dsoMouseEnter: argTypeAction(),
  dsoMouseLeave: argTypeAction(),
  dsoActiveChange: argTypeAction(),
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
  activatable: {
    control: {
      type: "boolean",
    },
  },
};

export function legendItemArgsMapper<TemplateFnReturnType>(
  a: LegendItemArgs,
  content?: TemplateFnReturnType,
  symbol?: TemplateFnReturnType,
  options?: TemplateFnReturnType,
): LegendItem<TemplateFnReturnType> {
  return {
    ...a,
    options,
    content: content || a.label || "",
    symbol,
    dsoActiveChange: (e) => a.dsoActiveChange(e.detail),
  };
}
