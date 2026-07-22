export type AdvancedSelectVariant = "primary" | "success" | "info" | "warning" | "error" | "attention";

export interface AdvancedSelectOption<T> {
  label: string;
  value?: T;
}

export interface AdvancedSelectGroupRedirect {
  label: string;
  href: string;
}

export interface AdvancedSelectGroup<T> {
  label: string;
  badgeLabel?: string;
  activeLabel?: string;
  summaryCounter?: boolean;
  redirect?: AdvancedSelectGroupRedirect;
  options: AdvancedSelectOption<T>[];
  variant?: AdvancedSelectVariant;
  toggletip?: string;
}

export interface AdvancedSelectPlaceholder {
  label: string;
  redirect?: AdvancedSelectGroupRedirect;
  placeholder: string;
}

export interface AdvancedSelect<T> {
  options: (AdvancedSelectOption<T> | AdvancedSelectGroup<T> | AdvancedSelectPlaceholder)[];
  active?: AdvancedSelectOption<T>;
  activeHint?: string;
  dsoChange?: (e: CustomEvent<AdvancedSelectChangeEvent<T>>) => void;
  dsoRedirect?: (e: CustomEvent<AdvancedSelectRedirectEvent>) => void;
}

export interface AdvancedSelectChangeEvent<T> {
  originalEvent: MouseEvent;
  option: AdvancedSelectOption<T>;
}

export interface AdvancedSelectRedirectEvent {
  originalEvent: MouseEvent;
  redirect: AdvancedSelectGroupRedirect;
  isModifiedEvent: boolean;
}
