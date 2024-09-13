export interface Tabs<TemplateFnReturnType> {
  items: TabsItem[];
  content: TemplateFnReturnType | string;
}

export interface TabsItem {
  label: string;
  identifier: string;
  href?: string;
  modifiers?: "active" | "disabled";
  dsoTabSwitch?: (e: CustomEvent<TabsSwitchEvent>) => void;
}

export interface TabsSwitchEvent {
  originalEvent: MouseEvent | KeyboardEvent;
  isModifiedEvent: boolean;
}
