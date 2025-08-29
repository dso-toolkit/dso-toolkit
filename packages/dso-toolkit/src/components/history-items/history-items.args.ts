import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";
import { fn } from "storybook/test";

import { argTypeAction } from "../../storybook";

import { HistoryItem, HistoryItems } from "./history-items.models.js";

export interface HistoryItemsArgs {
  dsoHistoryItemClick: HandlerFunction;
}

export const historyItemsArgs: HistoryItemsArgs = {
  dsoHistoryItemClick: fn(),
};

export const historyItemsArgTypes: ArgTypes<HistoryItemsArgs> = {
  dsoHistoryItemClick: argTypeAction(),
};

export function historyItemsArgsMapper(
  a: HistoryItemsArgs,
  headings: string[],
  historyItems: HistoryItem[],
): HistoryItems {
  return {
    headings,
    historyItems: historyItems.map((hi) => {
      return {
        ...hi,
        dsoHistoryItemClick: (e) => a.dsoHistoryItemClick(e.detail),
      };
    }),
  };
}
