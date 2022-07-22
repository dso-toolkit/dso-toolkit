import { ArgTypes } from '../../stories-helpers';

import { Tabs, TabsItem } from './tabs.models';

export interface TabsArgs {
  tabs: TabsItem[];
}

export const tabsArgTypes: ArgTypes<TabsArgs> = {
  tabs: {
    control: {
      disable: true
    }
  }
};

export function tabsArgsMapper(a: TabsArgs): Tabs {
  return {
    tabs: a.tabs
  };
}
