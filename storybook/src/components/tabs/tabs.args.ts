import type { ArgTypes } from "@storybook/web-components-vite";
import { TemplateResult } from "lit-html";
import { HandlerFunction } from "storybook/actions";

import { argTypeAction } from "../../shared/arg-type-action.js";
import { noControl } from "../../shared/no-control.js";

import { Tabs, TabsItem } from "./tabs.models.js";

export interface TabsArgs {
  items: TabsItem[];
  content: TemplateResult | string;
  dsoTabSwitch: HandlerFunction;
}

export const tabsArgTypes: ArgTypes<TabsArgs> = {
  items: noControl(),
  content: noControl(),
  dsoTabSwitch: argTypeAction(),
};

export function tabsArgsMapper(a: TabsArgs): Tabs {
  return {
    ...a,
    items: a.items.map((i: TabsItem) => {
      return {
        ...i,
        dsoTabSwitch: (e) => a.dsoTabSwitch(e.detail),
      };
    }),
  };
}
