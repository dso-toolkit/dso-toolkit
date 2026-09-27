import { TemplateResult } from "lit-html";

interface TableHeadingUnsortable {
  label: string;
}

interface TableHeadingSortable {
  label: string;
  sortable: true;
  sorting?: TableSorting;
}

export type TableSorting = "ascending" | "descending";

export interface TableContent {
  caption: string;
  head: (TableHeadingUnsortable | TableHeadingSortable)[];
  rows: (TemplateResult | string)[][];
}

export interface Table {
  /** Prevents the table being opened in a modal. */
  noModal?: boolean;
  content: TableContent;
  headingColumns?: boolean;
  role?: string;
  verticalLines?: boolean;
}
