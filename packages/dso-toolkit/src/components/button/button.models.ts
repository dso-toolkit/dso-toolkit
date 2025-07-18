import { Icon } from "../icon/icon.models.js";

interface ButtonBase {
  /**
   * - `primary`: Primary button
   * - `secondary`: Secondary button
   * - `tertiary`: Tertiary button
   * - `map`: Map button
   */
  label: string;
  modifier?: string;
  mode?: ButtonMode;
  id?: string;
  icon?: Icon;
  iconMode?: "only" | "after";
  slot?: string;
  align?: boolean;
  autofocus?: boolean;
}

export type ButtonMode = "download" | "extern";

export interface Button extends ButtonBase {
  variant: "primary" | "secondary" | "tertiary" | "map" | null;
  type?: "button" | "submit";
  disabled?: boolean;
  truncate?: boolean;
  compact?: boolean;
  ariaDescribedby?: string;
  ariaExpanded?: boolean;
  ariaHaspopup?: "false" | "true" | "menu" | "listbox" | "tree" | "grid" | "dialog";
  ariaRoledescription?: string;
  screenreaderPrefix?: string;
  screenreaderSuffix?: string;
  onClick?: (event: MouseEvent) => void;
}

export interface ButtonAnchor extends ButtonBase {
  /**
   * - `primary`: Primary button
   * - `secondary`: Secondary button
   * - `tertiary`: Tertiary button
   * - `map`: Map button
   */
  variant: "primary" | "secondary" | "tertiary" | "map";
  url: string;
}

export function isButtonInterface(object: unknown): object is Button {
  return "variant" in (object as Button);
}
