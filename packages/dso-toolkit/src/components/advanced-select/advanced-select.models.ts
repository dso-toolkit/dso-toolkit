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

export type AdvancedSelectOptionOrGroup<T> = AdvancedSelectOption<T> | AdvancedSelectGroup<T>;

export interface AdvancedSelect<T> {
  options: AdvancedSelectOptionOrGroup<T>[];
  active?: AdvancedSelectOption<T>;
  activeHint?: string;
  dsoOptionClick?: (e: CustomEvent<AdvancedSelectOptionClickEvent<T>>) => void;
  dsoRedirectClick?: (e: CustomEvent<AdvancedSelectRedirectClickEvent>) => void;
}

export interface AdvancedSelectOptionClickEvent<T> {
  originalEvent: MouseEvent;
  option: AdvancedSelectOption<T>;
}

export interface AdvancedSelectRedirectClickEvent {
  originalEvent: MouseEvent;
  redirect: AdvancedSelectGroupRedirect;
}
