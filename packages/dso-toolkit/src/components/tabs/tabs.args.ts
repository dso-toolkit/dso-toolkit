import { ArgTypes } from "@storybook/types";

import { noControl } from "../../storybook/index.js";

import { Tabs, TabsItem } from "./tabs.models.js";

export interface TabsArgs<TemplateFnReturnType> {
  items: TabsItem<TemplateFnReturnType>[];
}

export const tabsArgTypes: ArgTypes<TabsArgs<unknown>> = {
  items: {
    ...noControl,
  },
};

export function tabsArgsMapper<TemplateFnReturnType>(a: TabsArgs<TemplateFnReturnType>): Tabs<TemplateFnReturnType> {
  return {
    items: a.items,
  };
}
