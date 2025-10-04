import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";
import { fn } from "storybook/test";

import { argTypeAction } from "../../storybook";

import { HistoryItem, HistoryItemType } from "./history-item.models.js";

export interface HistoryItemArgs {
  date: string;
  explanation?: string;
  statusMessage: string;
  title?: string;
  href?: string;
  type: HistoryItemType;
  warning?: string;
  dsoHistoryItemClick: HandlerFunction;
}

export const historyItemArgs: Omit<HistoryItemArgs, "href"> = {
  date: "20-07-2025",
  statusMessage: "Inzage tot 20-10-2025",
  type: "ontwerp",
  title: '"Voorbeschermingsregels hyperscale datacentra" opgenomen in plan',
  explanation: undefined,
  warning: undefined,
  dsoHistoryItemClick: fn(),
};

export const historyItemArgTypes: ArgTypes<HistoryItemArgs> = {
  date: {
    control: {
      type: "text",
    },
  },
  statusMessage: {
    control: {
      type: "text",
    },
  },
  type: {
    options: ["in-werking", "besluit", "tijdelijk-regelingdeel", "waarschuwing", "ontwerp"],
    control: {
      type: "select",
    },
  },
  title: {
    control: {
      type: "text",
    },
  },
  explanation: {
    control: {
      type: "text",
    },
  },
  warning: {
    control: {
      type: "text",
    },
  },
  dsoHistoryItemClick: argTypeAction(),
};

export function historyItemArgsMapper(a: HistoryItemArgs): HistoryItem {
  return {
    ...a,
    href: "#",
    dsoHistoryItemClick: (e) => a.dsoHistoryItemClick(e.detail),
  };
}
