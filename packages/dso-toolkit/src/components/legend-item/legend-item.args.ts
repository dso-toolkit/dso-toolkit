import { HandlerFunction } from "@storybook/addon-actions";
import { ArgTypes } from "@storybook/types";

import { LegendItem } from "./legend-item.models.js";
import { noControl } from "../../storybook";

export interface LegendItemArgs {
  disabled: boolean;
  disabledMessage: string;
  dsoMouseEnter: HandlerFunction;
  dsoMouseLeave: HandlerFunction;
  dsoRemoveClick: HandlerFunction;
  label: string;
  removable: boolean;
  selectable: boolean;
  symbol: string | undefined;
}

export const legendItemArgs: Omit<
  LegendItemArgs,
  "dsoMouseEnter" | "dsoMouseLeave" | "dsoRemoveClick" | "selectables" | "label" | "selectable" | "symbol"
> = {
  disabled: false,
  disabledMessage: "",
  removable: false,
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
  dsoRemoveClick: {
    ...noControl,
    action: "dsoRemoveClick",
  },
  label: {
    control: {
      type: "text",
    },
  },
  removable: {
    control: {
      type: "boolean",
    },
  },
  selectable: {
    control: {
      type: "boolean",
    },
  },
  symbol: {
    control: {
      type: "text",
    },
  },
};

export function legendItemArgsMapper<TemplateFnReturnType>(
  a: LegendItemArgs,
  content?: TemplateFnReturnType,
  symbol?: TemplateFnReturnType,
  body?: TemplateFnReturnType,
): LegendItem<TemplateFnReturnType> {
  return {
    ...a,
    body,
    content: content || a.label || "",
    symbol,
  };
}
