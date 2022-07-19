import { ArgTypes } from '../../stories-helpers';

import { Tabs, TabItem } from './tabs.models';

export interface TabsArgs {
  tabs: TabItem[];
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
