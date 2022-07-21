export interface Pagination {
  count: number;
  current: number;
  label: string;
  onSelectPage: (e: CustomEvent<any>) => void;
}
