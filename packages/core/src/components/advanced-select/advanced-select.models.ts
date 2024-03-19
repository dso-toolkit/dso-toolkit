export type AdvancedSelectVariant = "primary" | "success" | "info" | "warning" | "danger" | "error" | "attention";

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
  summaryCounter?: boolean;
  redirect?: AdvancedSelectGroupRedirect;
  placeholder?: string;
  options?: AdvancedSelectOption<T>[];
  variant?: AdvancedSelectVariant;
}

export type AdvancedSelectOptionOrGroup<T> = AdvancedSelectOption<T> | AdvancedSelectGroup<T>;

export interface AdvancedSelectChangeEvent<T> {
  originalEvent: MouseEvent;
  option: AdvancedSelectOption<T>;
}

export interface AdvancedSelectRedirectEvent {
  originalEvent: MouseEvent;
  isModifiedEvent: boolean;
  redirect: AdvancedSelectGroupRedirect;
}
