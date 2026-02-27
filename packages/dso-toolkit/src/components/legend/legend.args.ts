import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";
import { fn } from "storybook/test";

import { argTypeAction, componentArgs } from "../../storybook";

import { Legend, LegendMode, LegendTabItem } from "./legend.models";

export interface LegendArgs {
  mode: LegendMode;
  disabled: boolean;
  disabledMessage: string;
  active: boolean;
  activatable: boolean;
  label: string;
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
  disabled: {
    control: { type: "boolean" },
  },
  disabledMessage: {
    control: { type: "text" },
  },
  active: {
    control: { type: "boolean" },
  },
  activatable: {
    control: { type: "boolean" },
  },
  label: {
    control: { type: "text" },
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
  disabled: false,
  disabledMessage: "Voorbeeld tekst",
  active: true,
  activatable: true,
  label: "Topografie (BRT)",
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
