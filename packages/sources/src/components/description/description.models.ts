export interface Description {
  type: 'term' | 'note';
  id: string;
  term: string;
  content: string;
  open: boolean;
}
