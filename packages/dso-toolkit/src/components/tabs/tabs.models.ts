export interface Tabs<TemplateFnReturnType> {
  items: TabsItem<TemplateFnReturnType>[];
}

export interface TabsItem<TemplateFnReturnType> {
  label: string;
  id: string;
  modifiers?: "active" | "disabled";
  content: TemplateFnReturnType | string;
}
