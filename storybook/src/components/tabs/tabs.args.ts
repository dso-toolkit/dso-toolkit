import { TemplateResult } from "lit-html";
import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";

import { argTypeAction } from "../../shared/arg-type-action.js";

import { Tabs, TabsItem } from "./tabs.models.js";

export interface TabsArgs<TemplateFnReturnType> {
  items: TabsItem[];
  content: TemplateFnReturnType | string;
  dsoTabSwitch: HandlerFunction;
}

export const tabsArgTypes: ArgTypes<TabsArgs<TemplateResult>> = {
  items: argTypeAction(),
  content: argTypeAction(),
  dsoTabSwitch: argTypeAction(),
};

export function tabsArgsMapper<TemplateFnReturnType>(a: TabsArgs<TemplateFnReturnType>): Tabs<TemplateFnReturnType> {
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
