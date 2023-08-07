export enum Type {
  Ul = "ul",
  Ol = "ol",
}

export interface List {
  type?: Type;
  items: ListItem[];
  modifier?: string;
}

export type ListItem = ListItemDefault | ListItemWithStatus;

export interface ListItemDefault {
  text: string;
  imgSrc?: string;
}

export interface ListItemWithStatus extends ListItemDefault {
  status: "forbidden" | "status-warning";
  statusDescription: string;
}
