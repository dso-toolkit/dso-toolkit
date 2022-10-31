import { Icon } from "../icon/icon.models";

export interface Button {
  /**
   * * `primary`: Primary button
   * * `secondary`: Secondary button (aka: btn-default)
   * * `tertiary`: Tertiary button (aka: btn-link)
   * * `null` legacy modus, switch to property "modifier"
   */
  variant: "primary" | "secondary" | "tertiary" | null;
  label: string;
  modifier?: string;
  type?: "button" | "submit";
  id?: string;
  disabled?: boolean;
  icon?: Icon;
  iconMode?: "only" | "after";
  ariaDescribedby?: string;
  ariaExpanded?: boolean;
  ariaHaspopup?: "false" | "true" | "menu" | "listbox" | "tree" | "grid" | "dialog";
  ariaRoledescription?: string;
  onClick?: (event: MouseEvent) => void;
}

export interface ButtonAnchor {
  variant: "primary" | "secondary" | "tertiary" | null;
  url: string;
  label: string;
  modifier?: string;
  id?: string;
  icon?: Icon;
  iconMode?: "only" | "after";
}
