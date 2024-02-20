import {AdvancedSelectGroupRedirect, AdvancedSelectOption} from "./advanced-select.models";

export interface AdvancedSelectClickEvent {
  originalEvent: MouseEvent;
}

export interface AdvancedSelectOptionClickEvent {
  originalEvent: MouseEvent;
  value: AdvancedSelectOption<unknown>;
}

export interface AdvancedSelectRedirectClickEvent {
  originalEvent: MouseEvent;
  value: AdvancedSelectGroupRedirect;
}
