import { HandlerFunction } from "@storybook/addon-actions";
import { ArgTypes } from "@storybook/types";

import { noControl } from "../../storybook";

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

export const legendItemArgs: Omit<LegendItemArgs, "dsoMouseEnter" | "dsoMouseLeave" | "dsoActiveChange"> = {
  disabled: false,
  disabledMessage: "",
  active: true,
  activatable: true,
  label: "Legenda item label",
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
  dsoMouseEnter: {
    ...noControl,
    action: "dsoMouseEnter",
  },
  dsoMouseLeave: {
    ...noControl,
    action: "dsoMouseLeave",
  },
  dsoActiveChange: {
    ...noControl,
    action: "dsoActiveChange",
  },
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
  };
}
