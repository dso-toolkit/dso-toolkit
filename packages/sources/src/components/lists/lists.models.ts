export enum ListType {
  Ul = 'ul',
  Ol = 'ol'
}

export interface Lists {
  type?: ListType;
  items: ListItem[];
  modifier?: string;
}

export interface ListItem {
  text: string;
}
