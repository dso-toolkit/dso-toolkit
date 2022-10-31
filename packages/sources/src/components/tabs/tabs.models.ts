export interface Tabs {
  items: TabsItem[];
}

export interface TabsItem {
  label: string;
  id: string;
  modifiers?: "active" | "disabled";
}
