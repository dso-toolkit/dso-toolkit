import { AdvancedSelectOption } from "./advanced-select.models";

export interface AdvancedSelectClickEvent {
  originalEvent: MouseEvent;
}

export interface AdvancedSelectOptionClickEvent {
  originalEvent: MouseEvent;
  value: AdvancedSelectOption<unknown>;
}
