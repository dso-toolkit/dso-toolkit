export interface Tabs {
  tabs: TabsItem[];
}

export interface TabsItem {
  label: string;
  id: string;
  modifiers: 'active' | 'disabled';
}
