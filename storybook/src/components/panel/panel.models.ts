import { TemplateResult } from "lit-html";

export interface Panel {
  children: TemplateResult | string;
  emphasized?: boolean;
  heading: TemplateResult | string;
  dsoCloseClick?: (e: CustomEvent<PanelCloseEvent>) => void;
}

export interface PanelCloseEvent {
  originalEvent: Event;
}
