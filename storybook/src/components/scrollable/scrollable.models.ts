import { TemplateResult } from "lit-html";

export interface Scrollable {
  dsoScrollEnd?: (e: CustomEvent<DsoScrollEndEvent>) => void;
  children: TemplateResult | string;
}

export interface DsoScrollEndEvent {
  scrollEnd: "top" | "bottom";
}
