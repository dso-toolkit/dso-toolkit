export interface Legend<TemplateFnReturnType> {
  content: TemplateFnReturnType;
  tabItems: LegendTabItem[];
  dsoContentSwitch?: (e: CustomEvent<LegendContentSwitchEvent>) => void;
  dsoClose?: (e: CustomEvent<LegendCloseEvent>) => void;
  dsoLegendGroupModeChange?: (e: CustomEvent<LegendMode>) => void;
}

export type LegendMode = "edit" | "view";

export interface LegendTabItem {
  label: string;
  id: string;
  active: boolean;
}

export interface LegendContentSwitchEvent {
  originalEvent: MouseEvent | KeyboardEvent;
  isModifiedEvent: boolean;
  tabItem: LegendTabItem;
}

export interface LegendCloseEvent {
  originalEvent?: MouseEvent | Event;
}
