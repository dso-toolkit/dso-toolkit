export interface Tabs {
  tabs: TabItem[];
}

export interface TabItem {
  label: string;
  id: string;
  modifiers: 'active' | 'disabled';
}
