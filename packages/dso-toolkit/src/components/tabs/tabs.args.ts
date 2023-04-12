import { ArgTypes, noControl } from "../../storybook/index.js";

import { Tabs, TabsItem } from "./tabs.models.js";

export interface TabsArgs<TemplateFnRetunType> {
  items: TabsItem<TemplateFnRetunType>[];
}

export const tabsArgTypes: ArgTypes<TabsArgs<unknown>> = {
  items: {
    ...noControl,
  },
};

export function tabsArgsMapper<TemplateFnRetunType>(a: TabsArgs<TemplateFnRetunType>): Tabs<TemplateFnRetunType> {
  return {
    items: a.items,
  };
}
