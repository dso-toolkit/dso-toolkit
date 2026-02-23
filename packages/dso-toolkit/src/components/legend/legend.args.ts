import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";
import { fn } from "storybook/test";

import { argTypeAction, componentArgs } from "../../storybook";

import { Legend, LegendMode, LegendTabItem } from "./legend.models";

export interface LegendArgs {
  mode: LegendMode;
  tabItems: LegendTabItem[];
  dsoContentSwitch: HandlerFunction;
  dsoClose: HandlerFunction;
  dsoLegendGroupModeChange: HandlerFunction;
  dsoDelete: HandlerFunction;
}

export const legendArgTypes: ArgTypes<LegendArgs> = {
  mode: {
    control: { type: "select" },
    options: ["edit", "view"],
  },
  tabItems: argTypeAction(),
  dsoContentSwitch: argTypeAction(),
  dsoClose: argTypeAction(),
  dsoLegendGroupModeChange: argTypeAction(),
  dsoDelete: argTypeAction(),
};

export const legendaTabItem: LegendTabItem = {
  id: "123",
  label: "Legenda",
  active: false,
};

export const kaartlagenTabItem: LegendTabItem = {
  id: "456",
  label: "Kaartlagen",
  active: false,
};

export const legendArgs = componentArgs<LegendArgs>({
  mode: "view",
  tabItems: [{ ...legendaTabItem, active: true }, kaartlagenTabItem],
  dsoContentSwitch: fn(),
  dsoClose: fn(),
  dsoLegendGroupModeChange: fn(),
  dsoDelete: fn(),
});

export function legendArgsMapper<TemplateFnReturnType>(
  a: LegendArgs,
  content: TemplateFnReturnType,
): Legend<TemplateFnReturnType> {
  return {
    tabItems: a.tabItems,
    content,
    dsoContentSwitch: (e) => a.dsoContentSwitch(e.detail),
    dsoClose: (e) => a.dsoClose(e.detail),
  };
}
