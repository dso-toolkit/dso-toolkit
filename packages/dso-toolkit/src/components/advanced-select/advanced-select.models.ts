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

export type AdvancedSelectOptionsOrGroup<T> = AdvancedSelectOption<T> | AdvancedSelectGroup<T>;

export interface AdvancedSelect<T> {
  options: AdvancedSelectOptionsOrGroup<T>[];
  active?: AdvancedSelectOption<T>;
  open: boolean;
  dsoClick?: (e: CustomEvent<AdvancedSelectClickEvent>) => void;
  dsoOptionClick?: (e: CustomEvent<AdvancedSelectOptionClickEvent>) => void;
  dsoRedirectClick?: (e: CustomEvent<AdvancedSelectRedirectClickEvent>) => void;
}

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
