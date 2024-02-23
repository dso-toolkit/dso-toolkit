import { AdvancedSelectGroupRedirect, AdvancedSelectOption } from "./advanced-select.models";

export interface AdvancedSelectClickEvent {
  originalEvent: MouseEvent;
}

export interface AdvancedSelectOptionClickEvent<T> {
  originalEvent: MouseEvent;
  option: AdvancedSelectOption<T>;
}

export interface AdvancedSelectRedirectClickEvent {
  originalEvent: MouseEvent;
  redirect: AdvancedSelectGroupRedirect;
}
