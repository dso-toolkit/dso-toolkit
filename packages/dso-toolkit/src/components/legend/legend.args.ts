import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";
import { fn } from "storybook/test";

import { argTypeAction, componentArgs } from "../../storybook";

import { Legend, LegendTabItem } from "./legend.models";

export interface LegendArgs {
  tabItems: LegendTabItem[];
  dsoContentSwitch: HandlerFunction;
  dsoClose: HandlerFunction;
}

export const legendArgTypes: ArgTypes<LegendArgs> = {
  tabItems: argTypeAction(),
  dsoContentSwitch: argTypeAction(),
  dsoClose: argTypeAction(),
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
  tabItems: [{ ...legendaTabItem, active: true }, kaartlagenTabItem],
  dsoContentSwitch: fn(),
  dsoClose: fn(),
});

export function legendArgsMapper<TemplateFnReturnType>(
  a: LegendArgs,
  content: TemplateFnReturnType,
): Legend<TemplateFnReturnType> {
  return {
    ...a,
    tabItems: a.tabItems,
    content,
    dsoContentSwitch: (event) => {
      event.preventDefault();
      a.dsoContentSwitch(event.detail);
    },
    dsoClose: (event) => {
      event.preventDefault();
      a.dsoClose(event.detail);
    },
  };
}
