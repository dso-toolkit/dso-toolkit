import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";
import { fn } from "storybook/test";

import { argTypeAction } from "../../storybook";

import { HistoryItem, HistoryItems } from "./history-items.models.js";

export type HistoryItemListPattern = "in-werking" | "ontwerp";

export interface HistoryItemsArgs {
  label: string;
  listPattern: HistoryItemListPattern;
  dsoHistoryItemClick: HandlerFunction;
}

export const historyItemsArgs: HistoryItemsArgs = {
  label: "Gebeurtenis",
  listPattern: "in-werking",
  dsoHistoryItemClick: fn(),
};

export const historyItemsArgTypes: ArgTypes<HistoryItemsArgs> = {
  label: {
    control: {
      type: "text",
    },
  },
  listPattern: {
    control: {
      type: "select",
      labels: {
        "in-werking": "In werking",
        ontwerp: "Ontwerp",
      },
    },
    name: "list pattern",
    options: ["in-werking", "ontwerp"],
  },
  dsoHistoryItemClick: argTypeAction(),
};

export function historyItemsArgsMapper(a: HistoryItemsArgs, historyItems: HistoryItem[]): HistoryItems {
  return {
    label: a.label,
    historyItems: historyItems.map((hi) => {
      return {
        ...hi,
        dsoHistoryItemClick: (e) => a.dsoHistoryItemClick(e.detail),
      };
    }),
  };
}
