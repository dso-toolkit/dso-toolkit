export interface Colspecs {
  totalWidth: number;
  count: number;
  columns: Colspec[];
}

export interface Colspec {
  colsep: string | null;
  name: string;
  number: number;
  rowsep: string | null;
  width: string | undefined;
}
