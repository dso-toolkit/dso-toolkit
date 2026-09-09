import { TemplateResult } from "lit-html";

import { Info } from "../info/info.models.js";

export interface Selectable {
  type: "radio" | "checkbox";
  id: string;
  name?: string;
  label?: TemplateResult | string;
  value?: string;
  required?: boolean;
  invalid?: boolean;
  describedById?: string;
  errormessage?: string;
  labelledById?: string;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  dsoChange?: (e: SelectableChangeEvent) => void;
  info?: Info;
  slot?: string;
  options?: Selectable[];
}

export interface SelectableChangeEvent {
  originalEvent: Event;
  checked: boolean;
  name?: string;
  value?: string;
}
