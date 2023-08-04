export enum Type {
  Ul = "ul",
  Ol = "ol",
}

export interface List {
  type?: Type;
  items: ListItem[];
  modifier?: string;
}

export interface ListItem {
  text: string;
  imgSrc?: string;
  modifier?: string;
}
