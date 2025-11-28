import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";
import { fn } from "storybook/test";

import { argTypeAction, componentArgs } from "../../storybook";

import { Legend, TabItem } from "./legend.models";

export interface LegendArgs {
  tabItems: TabItem[];
  dsoContentSwitch: HandlerFunction;
  dsoClose: HandlerFunction;
}

export const legendArgTypes: ArgTypes<LegendArgs> = {
  tabItems: {
    control: {
      disable: true,
    },
  },
  dsoContentSwitch: argTypeAction(),
  dsoClose: argTypeAction(),
};

export const legendArgs = componentArgs<LegendArgs>({
  tabItems: [
    {
      label: "Legenda",
      active: true,
      id: "123",
    },
    {
      label: "Kaartlagen",
      id: "456",
      active: false,
    },
  ],
  dsoContentSwitch: fn(),
  dsoClose: fn(),
});

export function legendArgsMapper<TemplateFnReturnType>(
  a: LegendArgs,
  content?: TemplateFnReturnType,
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
