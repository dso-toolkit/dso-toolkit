export interface Colspecs {
  totalWidth: number;
  count: number;
  columns: Colspec[];
}

export interface Colspec {
  name: string;
  number: number;
  width: string | undefined;
}
