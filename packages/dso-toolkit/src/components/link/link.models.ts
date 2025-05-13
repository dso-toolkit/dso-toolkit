import { Icon } from "../icon/icon.models.js";

export interface Link {
  icon?: Icon;
  iconMode?: "after";
  label: string;
  modifier?: string;
  mode?: "download" | "extern";
  url: string;
  ariaCurrent?: string;
}
