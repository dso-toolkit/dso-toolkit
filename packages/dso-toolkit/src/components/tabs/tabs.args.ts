import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";

import { noControl } from "../../storybook/index.js";

import { Tabs, TabsItem } from "./tabs.models.js";

export interface TabsArgs<TemplateFnReturnType> {
  items: TabsItem[];
  content: TemplateFnReturnType | string;
  dsoTabSwitch: HandlerFunction;
}

export const tabsArgTypes: ArgTypes<TabsArgs<unknown>> = {
  items: {
    ...noControl,
  },
  content: {
    ...noControl,
  },
  dsoTabSwitch: {
    ...noControl,
    action: "dsoTabSwitch",
  },
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
