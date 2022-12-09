import { Icon } from "../icon/icon.models.js";

export interface Anchor {
  icon?: Icon;
  iconMode?: "after";
  label: string;
  modifier?: string;
  url: string;
  ariaCurrent?: string;
}
