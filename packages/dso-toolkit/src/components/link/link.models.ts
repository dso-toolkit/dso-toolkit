import { Icon } from "../icon";

export interface Link {
  icon?: Icon;
  iconMode?: "after";
  label: string;
  modifier?: string;
  mode?: "download" | "extern";
  url: string;
  ariaCurrent?: string;
}
