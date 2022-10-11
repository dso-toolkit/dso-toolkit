export interface TableContent {
  caption: string;
  head: string[];
  rows: string[][];
}

export interface Table {
  /** Prevents the table being opened in a modal. */
  noModal?: boolean;
  content: TableContent;
}
