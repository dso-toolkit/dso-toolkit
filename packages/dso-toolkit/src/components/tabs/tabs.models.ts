export interface Tabs<TemplateFnRetunType> {
  items: TabsItem<TemplateFnRetunType>[];
}

export interface TabsItem<TemplateFnRetunType> {
  label: string;
  id: string;
  modifiers?: "active" | "disabled";
  content: TemplateFnRetunType | string;
}
