export interface Tabs<TemplateFnReturnType> {
  tabItems: TabsItem[];
  content: TemplateFnReturnType | string;
}

export interface TabsItem {
  label?: string;
  identifier: string;
  active?: boolean;
  disabled?: boolean;
  dsoTabSwitch?: (e: CustomEvent<TabsSwitchEvent>) => void;
}

export interface TabsSwitchEvent {
  originalEvent: MouseEvent | KeyboardEvent;
  isModifiedEvent: boolean;
}