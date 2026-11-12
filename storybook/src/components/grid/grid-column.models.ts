import { TemplateResult } from "lit-html";

export interface GridColumnCloseEvent {
  originalEvent: MouseEvent | Event;
}

export interface GridColumn {
  columns: string;
  overlay?: boolean;
  dsoClose?: (event: CustomEvent<GridColumnCloseEvent>) => void;
  content: TemplateResult | string;
}
