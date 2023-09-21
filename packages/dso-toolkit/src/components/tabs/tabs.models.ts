export interface Tabs<TemplateFnRetunType> {
  items: TabsItem<TemplateFnRetunType>[];
  dsoTabSwitch?: (e: CustomEvent<TabsSwitchEvent>) => void;
}

export interface TabsItem<TemplateFnRetunType> {
  label: string;
  id: string;
  modifiers?: "active" | "disabled";
  content: TemplateFnRetunType | string;
}

export interface TabsSwitchEvent {
  originalEvent: MouseEvent | KeyboardEvent;
  selected: string;
}
