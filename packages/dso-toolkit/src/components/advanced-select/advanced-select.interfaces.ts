export type AdvancedSelectVariant = "primary" | "success" | "info" | "warning" | "error" | "attention";

export interface AdvancedSelectOption<T> {
  label: string;
  /**
   * An optional label to display for the option when it is the active option.
   * Falls back to `label` when not set.
   */
  selectedLabel?: string;
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

/**
 * Use this interface to create a placeholder option in the case a AdvancedSelectGroup has no options.
 */
export interface AdvancedSelectPlaceholder {
  label: string;
  redirect?: AdvancedSelectGroupRedirect;
  placeholder: string;
}

export interface AdvancedSelectChangeEvent<T> {
  originalEvent: MouseEvent;
  option: AdvancedSelectOption<T>;
}

export interface AdvancedSelectRedirectEvent {
  originalEvent: MouseEvent;
  isModifiedEvent: boolean;
  redirect: AdvancedSelectGroupRedirect;
}
