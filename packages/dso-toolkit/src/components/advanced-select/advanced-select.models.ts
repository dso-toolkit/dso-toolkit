export type AdvancedSelectVariant = "success" | "warning" | "error" | "info" | "bright";

export interface AdvancedSelectOption {
  label: string;
}

export interface AdvancedSelectGroupRedirect {
  label: string;
  href: string;
}

export interface AdvancedSelectGroup {
  label: string;
  summaryCounter?: boolean;
  redirect?: AdvancedSelectGroupRedirect;
  options: AdvancedSelectOption[];
  variant?: AdvancedSelectVariant;
}

export type AdvancedSelectOptionsOrGroup = AdvancedSelectOption | AdvancedSelectGroup;

export interface AdvancedSelect {
  options: AdvancedSelectOptionsOrGroup[];
  active?: AdvancedSelectOption;
  open?: boolean
}
