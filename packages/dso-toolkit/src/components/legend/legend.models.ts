export interface Legend<TemplateFnReturnType> {
  content?: TemplateFnReturnType;
  tabItems: TabItem[];
  dsoContentSwitch?: (e: CustomEvent<dsoContentSwitchEvent>) => void;
  dsoClose?: (e: CustomEvent<dsoCloseEvent>) => void;
}

export interface TabItem {
  label: string;
  id: string;
  active: boolean;
}

export interface dsoContentSwitchEvent {
  originalEvent: MouseEvent | KeyboardEvent;
  isModifiedEvent: boolean;
  tabItem: TabItem;
}

export interface dsoCloseEvent {
  originalEvent?: MouseEvent | Event;
}
