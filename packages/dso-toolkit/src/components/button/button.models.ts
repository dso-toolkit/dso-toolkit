import { Icon } from "../icon/icon.models.js";
import { Tooltip } from "../tooltip/tooltip.models.js";

export interface Button {
  /**
   * * `primary`: Primary button
   * * `secondary`: Secondary button
   * * `tertiary`: Tertiary button
   */
  variant: "primary" | "secondary" | "tertiary" | null;
  label: string;
  modifier?: string;
  type?: "button" | "submit";
  id?: string;
  disabled?: boolean;
  truncate?: boolean;
  icon?: Icon;
  iconMode?: "only" | "after";
  ariaDescribedby?: string;
  ariaExpanded?: boolean;
  ariaHaspopup?: "false" | "true" | "menu" | "listbox" | "tree" | "grid" | "dialog";
  ariaRoledescription?: string;
  screenreaderPrefix?: string;
  screenreaderSuffix?: string;
  onClick?: (event: MouseEvent) => void;
  tooltip?: Tooltip;
  slot?: string;
  compact?: boolean;
  align?: boolean;
  autofocus?: boolean;
  mode?: "download" | "extern";
}

export interface ButtonAnchor {
  variant: "primary" | "secondary" | "tertiary";
  url: string;
  label: string;
  modifier?: string;
  mode?: "download" | "extern";
  id?: string;
  icon?: Icon;
  iconMode?: "only" | "after";
  slot?: string;
  compact?: boolean;
  align?: boolean;
  autofocus?: boolean;
}

export function isButtonInterface(object: unknown): object is Button {
  return "variant" in (object as Button);
}
