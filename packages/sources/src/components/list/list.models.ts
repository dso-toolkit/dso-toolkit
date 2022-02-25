export enum Type {
  Ul = 'ul',
  Ol = 'ol'
}

export interface List {
  type?: Type;
  listItems: string[];
  modifier?: string;
}
