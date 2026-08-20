export interface GridColumn<TemplateFnReturnType> {
  columns: string;
  overlay?: boolean;
  content: TemplateFnReturnType | string;
}
