import { ArgTypes, noControl } from '../../stories-helpers';

import { Tabs, TabsItem } from './tabs.models';

export interface TabsArgs {
  items: TabsItem[];
}

export const tabsArgTypes: ArgTypes<TabsArgs> = {
  items: {
    ...noControl
  }
};

export function tabsArgsMapper(a: TabsArgs): Tabs {
  return {
    items: a.items
  };
}
