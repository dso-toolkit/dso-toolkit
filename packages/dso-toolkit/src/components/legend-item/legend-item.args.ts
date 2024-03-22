import { HandlerFunction } from "@storybook/addon-actions";
import { ArgTypes } from "@storybook/types";

import { LegendItem } from "./legend-item.models.js";
import { noControl } from "../../storybook";

export interface LegendItemArgs {
  disabled: boolean;
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
  removable: false,
};

export const legendItemArgTypes: ArgTypes<LegendItemArgs> = {
  disabled: {
    control: {
      type: "boolean",
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
  body?: TemplateFnReturnType,
): LegendItem<TemplateFnReturnType> {
  return {
    ...a,
    body,
    selectable: a.selectable
      ? {
          id: "1",
          type: "checkbox",
          value: "1",
          disabled: a.disabled,
          label: "Legenda item label",
          slot: "selectable",
        }
      : undefined,
  };
}
