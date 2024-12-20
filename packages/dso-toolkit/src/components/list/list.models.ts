import { Icon } from "../icon/icon.models.js";

export enum Type {
  Ul = "ul",
  Ol = "ol",
}

export interface List {
  type?: Type;
  items: ListItem[];
  modifier?: string;

  /**
   * Adds extra vertical and horizontal spacing between list items.
   *
   * Only available for `img-list` modifier.
   */
  spaced?: boolean;
}

export type ListItem = ListItemDefault | ListItemWithStatus;

export interface ListItemDefault {
  text: string;
  imgSrc?: string;
  icon?: Icon;
}

export interface ListItemWithStatus extends ListItemDefault {
  status: "forbidden" | "status-warning";
  statusDescription: string;
}
