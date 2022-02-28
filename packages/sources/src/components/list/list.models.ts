export enum Type {
  Ul = 'ul',
  Ol = 'ol'
}

export interface List {
  type?: Type;
  items: string[];
  modifier?: string;
}
