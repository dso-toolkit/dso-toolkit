import { ArgTypes, noControl } from "../../storybook/index.js";

import { Tabs, TabsItem } from "./tabs.models.js";

export interface TabsArgs {
  items: TabsItem[];
}

export const tabsArgTypes: ArgTypes<TabsArgs> = {
  items: {
    ...noControl,
  },
};

export function tabsArgsMapper(a: TabsArgs): Tabs {
  return {
    items: a.items,
  };
}
