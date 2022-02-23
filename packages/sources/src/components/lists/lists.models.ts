export enum ListType {
  Ul = 'ul',
  Ol = 'ol'
}

export interface Lists {
  type?: ListType;
  listItems: string[];
  modifier?: string;
}
