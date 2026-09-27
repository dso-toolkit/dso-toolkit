import { TemplateResult } from "lit-html";

export type AdvancedSelectVariant = "primary" | "success" | "info" | "warning" | "error" | "attention";

export interface AdvancedSelectOption {
  label: string;
  selectedLabel?: string;
  value?: TemplateResult | string;
}

export interface AdvancedSelectGroupRedirect {
  label: string;
  href: string;
}

export interface AdvancedSelectGroup {
  label: string;
  badgeLabel?: string;
  activeLabel?: string;
  summaryCounter?: boolean;
  redirect?: AdvancedSelectGroupRedirect;
  options: AdvancedSelectOption[];
  variant?: AdvancedSelectVariant;
  toggletip?: string;
}

export interface AdvancedSelectPlaceholder {
  label: string;
  redirect?: AdvancedSelectGroupRedirect;
  placeholder: string;
}

export interface AdvancedSelect {
  options: (AdvancedSelectOption | AdvancedSelectGroup | AdvancedSelectPlaceholder)[];
  active?: AdvancedSelectOption;
  activeHint?: string;
  dsoChange?: (e: CustomEvent<AdvancedSelectChangeEvent>) => void;
  dsoRedirect?: (e: CustomEvent<AdvancedSelectRedirectEvent>) => void;
}

export interface AdvancedSelectChangeEvent {
  originalEvent: MouseEvent;
  option: AdvancedSelectOption;
}

export interface AdvancedSelectRedirectEvent {
  originalEvent: MouseEvent;
  redirect: AdvancedSelectGroupRedirect;
  isModifiedEvent: boolean;
}
