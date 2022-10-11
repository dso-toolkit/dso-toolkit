export interface TableContent {
  caption: string;
  head: string[];
  rows: string[][];
}

export interface Table {
  responsive?: boolean;
  modal?: boolean;
  content: TableContent;
}
