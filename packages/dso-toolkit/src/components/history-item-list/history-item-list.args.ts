import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";
import { fn } from "storybook/test";

import { argTypeAction } from "../../storybook";

import { HistoryItem, HistoryItemList } from "./history-item-list.models.js";

export interface HistoryItemListArgs {
  dsoHistoryItemClick: HandlerFunction;
}

export const historyItemListArgs: HistoryItemListArgs = {
  dsoHistoryItemClick: fn(),
};

export const historyItemListArgTypes: ArgTypes<HistoryItemListArgs> = {
  dsoHistoryItemClick: argTypeAction(),
};

export function historyItemListArgsMapper(
  a: HistoryItemListArgs,
  headings: string[],
  historyItems: HistoryItem[],
): HistoryItemList {
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
