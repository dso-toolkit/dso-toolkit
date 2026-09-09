import { TemplateResult } from "lit-html";

export interface Tabs {
  items: TabsItem[];
  content: TemplateResult | string;
}

export interface TabsItem {
  label: string;
  href?: string;
  modifier?: "active" | "disabled";
  dsoTabSwitch?: (e: CustomEvent<TabsSwitchEvent>) => void;
}

export interface TabsSwitchEvent {
  originalEvent: MouseEvent | KeyboardEvent;
  isModifiedEvent: boolean;
}
