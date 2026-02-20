export interface Legend<TemplateFnReturnType> {
  content: TemplateFnReturnType;
  tabItems: LegendTabItem[];
  dsoContentSwitch?: (e: CustomEvent<LegendContentSwitchEvent>) => void;
  dsoClose?: (e: CustomEvent<LegendCloseEvent>) => void;
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

export interface LegendItem<TemplateFnReturnType> {
  options?: TemplateFnReturnType;
  content?: TemplateFnReturnType;
  disabled?: boolean;
  disabledMessage?: string;
  dsoMouseEnter?: (e: CustomEvent<MouseEvent>) => void;
  dsoMouseLeave?: (e: CustomEvent<MouseEvent>) => void;
  dsoActiveChange?: (e: CustomEvent<LegendItemActiveChangeEvent>) => void;
  dsoDelete?: (e: CustomEvent) => void;
  active?: boolean;
  activatable?: boolean;
  symbol?: TemplateFnReturnType;
}

export interface LegendItemActiveChangeEvent {
  /**
   * De huidige status van de legend.
   */
  current: boolean;

  /**
   * De gewenste status van de legend.
   */
  next: boolean;

  originalEvent: Event;
}

export interface LegendGroup<TemplateFnReturnType = unknown> {
  mode?: LegendMode;
  heading?: TemplateFnReturnType;
  children?: TemplateFnReturnType;
  dsoLegendGroupModeChange?: (e: CustomEvent) => void;
}
