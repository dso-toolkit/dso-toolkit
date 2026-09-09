export interface GridColumnCloseEvent {
  originalEvent: MouseEvent | Event;
}

export interface GridColumn<TemplateFnReturnType> {
  columns: string;
  overlay?: boolean;
  dsoClose?: (event: CustomEvent<GridColumnCloseEvent>) => void;
  content: TemplateFnReturnType | string;
}
