interface TableHeadingUnsortable {
  label: string;
}

interface TableHeadingSortable {
  label: string;
  sortable: true;
  sorting?: TableSorting;
}

export type TableSorting = "ascending" | "descending";

export interface TableContent<TemplateFnReturnType> {
  caption: string;
  head: (TableHeadingUnsortable | TableHeadingSortable)[];
  rows: (TemplateFnReturnType | string)[][];
}

export interface Table<TemplateFnReturnType> {
  /** Prevents the table being opened in a modal. */
  noModal?: boolean;
  content: TableContent<TemplateFnReturnType>;
  headingColumns?: boolean;
  role?: string;
  verticalLines?: boolean;
}
