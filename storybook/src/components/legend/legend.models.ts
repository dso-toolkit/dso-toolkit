import { TemplateResult } from "lit-html";

export interface Legend {
  content: TemplateResult | string;
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

export interface LegendItem {
  options?: TemplateResult | string;
  content?: TemplateResult | string;
  disabled?: boolean;
  disabledMessage?: string;
  dsoMouseEnter?: (e: CustomEvent<MouseEvent>) => void;
  dsoMouseLeave?: (e: CustomEvent<MouseEvent>) => void;
  dsoActiveChange?: (e: CustomEvent<LegendItemActiveChangeEvent>) => void;
  dsoDelete?: (e: CustomEvent) => void;
  active?: boolean;
  activatable?: boolean;
  symbol?: TemplateResult | string;
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

export interface LegendGroup {
  mode?: LegendMode;
  heading?: TemplateResult | string;
  options?: TemplateResult | string;
  children?: TemplateResult | string;
  dsoLegendGroupModeChange?: (e: CustomEvent) => void;
}
