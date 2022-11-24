export interface TableContent<TemplateFnReturnType> {
  caption: string;
  head: string[];
  rows: (TemplateFnReturnType | string)[][];
}

export interface Table<TemplateFnReturnType> {
  /** Prevents the table being opened in a modal. */
  noModal?: boolean;
  content: TableContent<TemplateFnReturnType>;
  headingColumns?: boolean;
  role?: string;
}
