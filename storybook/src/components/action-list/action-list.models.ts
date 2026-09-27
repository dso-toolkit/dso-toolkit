import { TemplateResult } from "lit-html";

export interface ActionList {
  title: string;
  actionListItems: ActionListItem[];
}

export interface ActionListItem {
  title?: string;
  flowLine?: boolean;
  warning?: boolean;
  divider?: boolean;
  content?: TemplateResult | string;
}
