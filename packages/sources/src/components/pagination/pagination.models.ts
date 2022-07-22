export interface PaginationSelectPageEvent {
  /** The selected page */
  page: number;
  /** The original pointer event */
  originalEvent: MouseEvent;
}

export interface Pagination {
  totalPages: number;
  currentPage: number;
  formatHref: (page: number) => string;
  onSelectPage: (e: CustomEvent<PaginationSelectPageEvent>) => void;
}
