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
  options: AdvancedSelectOption<T>[];
  variant?: AdvancedSelectVariant;
}

export interface AdvancedSelectPlaceholder {
  label: string;
  redirect?: AdvancedSelectGroupRedirect;
  placeholder: string;
}

export type AdvancedSelectOptionOrGroup<T> =
  | AdvancedSelectOption<T>
  | AdvancedSelectGroup<T>
  | AdvancedSelectPlaceholder;

export interface AdvancedSelectChangeEvent<T> {
  originalEvent: MouseEvent;
  option: AdvancedSelectOption<T>;
}

export interface AdvancedSelectRedirectEvent {
  originalEvent: MouseEvent;
  isModifiedEvent: boolean;
  redirect: AdvancedSelectGroupRedirect;
}
