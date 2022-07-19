export interface Tabs {
  tabs: TabItem[];
}

export interface TabItem {
  label: string;
  modifiers: 'active' | 'disabled';
}
