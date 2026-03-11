import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";

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
  current?: boolean;
  dsoClick: HandlerFunction;
}

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
    options: [
      "in-werking",
      "besluit",
      "tijdelijk-regelingdeel",
      "tijdelijk-regelingdeel-besluit",
      "waarschuwing",
      "ontwerp",
    ],
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
  current: {
    control: {
      type: "boolean",
    },
  },
  dsoClick: argTypeAction(),
};

export function historyItemArgsMapper(a: HistoryItemArgs): HistoryItem {
  return {
    ...a,
    href: "#",
    dsoClick: (e) => a.dsoClick(e.detail),
  };
}
