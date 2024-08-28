export interface Tabs<TemplateFnRetunType> {
  items: TabsItem<TemplateFnRetunType>[];
  dsoTabSwitch?: (e: CustomEvent<TabsSwitchEvent>) => void;
}

export interface TabsItem<TemplateFnReturnType> {
  label: string;
  id: string;
  modifiers?: "active" | "disabled";
  content: TemplateFnReturnType | string;
}

export interface TabsSwitchEvent {
  originalEvent: MouseEvent | KeyboardEvent;
  selected: string;
}
