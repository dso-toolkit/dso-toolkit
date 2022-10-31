import { Icon } from "../icon/icon.models";

export interface Anchor {
  icon?: Icon;
  iconMode?: "after";
  label: string;
  modifier?: string;
  url: string;
  ariaCurrent?: string;
}
